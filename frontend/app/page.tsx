import Link from "next/link";
import Navbar from "./ui/navbar";
import { connectToDB } from "./lib/db";

export default function Home() {
  connectToDB;
  return (
    <main>
      <Navbar />
      <video className="flex h-full w-full aspect-video" src=""></video>
    </main>
  );
}
