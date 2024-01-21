"use client";
import Link from "next/link";
import { register } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { convertToFile, resizeImage } from "@/lib/utils";
import Cropper from "react-cropper";
import Modal from "./ui/modal";
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

  return (
    <button
      className="focus:outline-none bg-slate-900 text-white font-bold tracking-wider block w-full p-2 rounded-lg disabled:bg-gray-600"
      disabled={status.pending}
    >
      {status.pending ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-4 h-full text-gray-200 animate-spin dark:text-gray-600 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div>Submit</div>
      )}
    </button>
  );
}
