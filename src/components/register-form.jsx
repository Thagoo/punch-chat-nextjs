"use client";
import Link from "next/link";
import { register } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { convertToFile, resizeImage } from "@/lib/utils";
import Cropper from "react-cropper";
import Modal from "@/ui/modal";
import "cropperjs/dist/cropper.css";

export default function RegisterForm() {
  // To reset form errors
  const [validationError, setValidationError] = useState({});

  const initialState = { errors: {}, message: {} };

  const [state, formAction] = useFormState(register, initialState);

  const inputFile = useRef(null);
  const [srcImage, setSrcImage] = useState();
  const [croppedImage, setCroppedImage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const cropperRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResetValidationErrors = () => {
    setValidationError({});
  };

  const handleImageSelection = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Resize image to less than 1 mb
      const resizedImageBlob = await resizeImage(file, 400, 400);

      setSrcImage(URL.createObjectURL(resizedImageBlob));

      openModal();
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const cropped = cropper.getCroppedCanvas().toDataURL();

    setCroppedImage(cropped);

    closeModal();
  };

  useEffect(() => {
    if (state.errors) {
      setValidationError(state);
    }
  }, [state]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-full w-full">
          {srcImage && (
            <Cropper
              ref={cropperRef}
              initialAspectRatio={1}
              src={srcImage}
              viewMode={1}
              minCropBoxHeight={400}
              minCropBoxWidth={400}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
              dragMode="crop"
              aspectRatio={1 / 1}
            />
          )}
          <button
            onClick={handleCrop}
            type="submit"
            className=" mt-4 focus:outline-none bg-blue-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg  hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </Modal>

      <div className="bg-gray-50  rounded-lg sm:border-2 px-4 lg:px-6 py-10 lg:max-w-md sm:max-w-md w-full text-center">
        <h1 className="text-2xl ">Sign Up</h1>
        <input
          accept="image/*"
          type="file"
          className="hidden"
          ref={inputFile}
          onChange={handleImageSelection}
        />
        <form action={formAction} className="text-center">
          <div className="py-2 text-left  flex flex-col items-center ">
            <Image
              src={croppedImage || "/assets/no-avatar.svg"}
              alt="avatar logo"
              width={100}
              height={24}
              onClick={() => inputFile.current.click()}
              className="rounded-full p-1"
            />

            <input
              type="type"
              id="avatar"
              name="avatar"
              className="hidden"
              value={croppedImage}
            />

            <p className="text-sm text-gray-900">Profile Picture</p>
          </div>
          <div className="py-2 text-left  flex">
            <div className="flex-col">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`border-2 ${
                  validationError?.errors?.firstName
                    ? "border-red-300"
                    : "border-gray-100"
                } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
                placeholder="First Name"
                onChange={handleResetValidationErrors}
                required
              />

              {validationError.errors?.firstName &&
                validationError.errors.firstName.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div className="flex-col">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`border-2 ${
                  validationError?.errors?.lastName
                    ? "border-red-300"
                    : "border-gray-100"
                } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
                placeholder="Last Name (optional)"
                onChange={handleResetValidationErrors}
              />
              {validationError.errors?.lastName &&
                validationError.errors.lastName.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="py-2 text-left">
            <input
              type="email"
              className={`border-2 ${
                validationError?.errors?.email
                  ? "border-red-300"
                  : "border-gray-100"
              } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleResetValidationErrors}
              required
            />
            {validationError.errors?.email &&
              validationError.errors.email.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="py-2 text-left">
            <input
              type="text"
              className={`border-2 ${
                validationError?.errors?.username
                  ? "border-red-300"
                  : "border-gray-100"
              } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
              placeholder="Username"
              id="username"
              name="username"
              onChange={handleResetValidationErrors}
              required
            />
            {validationError.errors?.username &&
              validationError.errors.username.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="py-2 text-left">
            <input
              type="password"
              className={`border-2 ${
                validationError?.errors?.password
                  ? "border-red-300"
                  : "border-gray-100"
              } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleResetValidationErrors}
              required
            />
            {validationError.errors?.password &&
              validationError.errors.password.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="py-2">
            <Submit />
          </div>
        </form>
        <div>
          <p>
            already have an account?{" "}
            <span className="text-blue-600">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

function Submit() {
  const status = useFormStatus();

  const spinnerStyle = {
    display: "inline",
    animation: "spin 1s linear infinite",
    fill: "#fff",
    color: "rgb(229 231 235 / var(--tw-text-opacity))",
  };

  return (
    <button
      className="focus:outline-none bg-slate-900 text-white font-bold tracking-wider block w-full p-2 rounded-lg disabled:bg-gray-600"
      disabled={status.pending}
    >
      {status.pending ? (
        <div role="status">
          <Image
            src={"/assets/loading-spinner.svg"}
            height={20}
            width={20}
            style={spinnerStyle}
            alt="spinner"
          />
        </div>
      ) : (
        <div>Submit</div>
      )}
    </button>
  );
}
