import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

async function Navbar() {
  const session = await auth();

  return (
    <>
      {" "}
      <nav className={` flex h-[15%] items-center justify-between`}>
        <div className="">
          <Link
            className="text-3xl font-extrabold sm:text-4xl text-slate-900"
            href="/"
          >
            Punch
          </Link>
        </div>
        {session?.user.email ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="hover:underline">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        ) : (
          <div>
            <button className="hover:underline">
              <Link href="/login" className="hidden md:block">
                Sign In
              </Link>
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
export default Navbar;
