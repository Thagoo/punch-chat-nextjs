"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const path = usePathname();

  if (path == "/login" || path == "/register") {
    return false;
  }

  return (
    <nav className={` flex h-[15%] items-center justify-between`}>
      <div className="">
        <Link
          className="text-3xl font-extrabold sm:text-4xl text-slate-900"
          href="/"
        >
          Punch
        </Link>
      </div>

      <div>
        <button>signin</button>
      </div>
    </nav>
  );
}
export default Navbar;
