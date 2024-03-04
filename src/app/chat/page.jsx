"use client";
import ChatInit from "@/components/chat/chat-init";
import Sidebar from "@/components/chat/sidebar";

export default function Page() {
  return (
    <>
      <div className="w-screen md:hidden border rounded ">
        <Sidebar />
      </div>
      <div className="hidden w-full md:flex flex-col border rounded p-2 ">
        <ChatInit />
      </div>
    </>
  );
}
