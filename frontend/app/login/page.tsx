import Link from "next/link";
import LoginForm from "../ui/login-form";

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex w-full justify-center items-center rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32  md:w-36">
            <Link href="/">
              <span className="text-2xl font-extrabold sm:text-5xl text-white">
                Punch
              </span>
            </Link>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
