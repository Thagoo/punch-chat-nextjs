import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-10 lg:max-w-xl sm:max-w-md w-full text-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/lock-icon.svg"
          alt="lock"
          width={35}
          height={35}
          className="bg-slate-400 rounded-full p-1"
        />
        <h1 className="text-2xl ">Sign In</h1>
      </div>
      <form class="text-center">
        <div class="py-2 text-left">
          <input
            type="email"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Email"
          />
        </div>
        <div class="py-2 text-left">
          <input
            type="password"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Password"
          />
        </div>
        <div class="py-2">
          <button
            type="submit"
            class="border-2 border-gray-100 focus:outline-none bg-slate-900 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800"
          >
            Sign In
          </button>
        </div>
      </form>
      <div>
        <p>
          Don't have an account?{" "}
          <span className="text-blue-600">
            <Link href="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
