"use client";
import Link from "next/link";
import { register } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  // To reset
  const [validationError, setValidationError] = useState({});

  const initialState = { errors: {}, message: {} };
  const [state, formAction] = useFormState(register, initialState);

  useEffect(() => {
    if (state.errors) {
      setValidationError(state);
    }
  }, [state]);

  const handleReset = () => {
    setValidationError({});
  };

  return (
    <div className="bg-gray-50 mt-10 rounded-lg sm:border-2 px-4 lg:px-6 py-10 lg:max-w-md sm:max-w-md w-full text-center">
      <h1 className="text-2xl ">Sign Up</h1>
      <form action={formAction} className="text-center">
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
              onChange={handleReset}
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
              onChange={handleReset}
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
            onChange={handleReset}
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
            onChange={handleReset}
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
          <button
            type="submit"
            className="border-2 border-gray-100 focus:outline-none bg-slate-900 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800"
          >
            Submit
          </button>
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
  );
}
