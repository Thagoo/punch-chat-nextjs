import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import Image from "next/image";

async function Navbar() {
  const session = await auth();

  return (
    <>
      {" "}
      <nav className={` flex h-[15%] items-center`}>
        <div className="flex-grow">
          <Link
            className="text-3xl font-extrabold sm:text-4xl text-slate-900"
            href="/"
          >
            Punch
          </Link>
        </div>
        {session?.user.id ? (
          <>
            <div>
              <Image
                src={session.user.avatar || "/assets/no-avatar.svg"}
                alt="avatar logo"
                width={40}
                height={24}
                className="rounded-full p-1 mr-2"
              />

              {/* <p className="text-xs">{session.user.username}</p> */}
            </div>
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
          </>
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
