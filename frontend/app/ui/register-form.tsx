"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./button";
import Link from "next/link";
import { addUser } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addUser, initialState);

  const handleProfilePicture = () => {
    if (email.length > 3) {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (state.message == "success") {
      router.refresh();
    }
  }, [state?.message]);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-center">Register</h1>
        <div>
          {open && (
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Profile Picture
              </label>

              <div className="relative flex justify-center">
                <img
                  className="peer block w-32 rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 "
                  id="avatar"
                  aria-describedby="user-error"
                  src={`https://robohash.org/${email}?set=set4`}
                />
                <input
                  id="avatar"
                  name="avatar"
                  type="text"
                  value={`https://robohash.org/${email}?set=set4`}
                  hidden
                />
              </div>
            </div>
          )}
          <div id="user-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your Name"
                required
                aria-describedby="user-error"
              />
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
                onBlur={handleProfilePicture}
              />
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4 text-right text-blue-600 ">
            <Link href={"/login"}>Click here to Login</Link>
          </div>
        </div>
        <RegisterButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
      </div>
    </form>
  );
}

function RegisterButton() {
  return <Button className="mt-4 w-full text-center">Register</Button>;
}
