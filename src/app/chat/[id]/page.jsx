import React, { Suspense } from "react";
import MessageInput from "@/components/chat/message-input";
import Image from "next/image";
import { useSelector } from "react-redux";
import ChatArena from "@/components/chat/chat-arena";
import ChatHeader from "@/components/chat/chat-header";
import ChatSkeleton from "@/ui/chat-skeleton";
import LoadingSpinner from "@/ui/loading-spinner";

export default async function Page({ params }) {
  // const response = await fetch("/api/user/searchUser", {
  //   method: "POST",
  //   body: JSON.stringify({ term: "user69" }),
  // });

  return (
    <div className="w-full  flex flex-col border rounded">
      <div>
        <ChatHeader />
      </div>

      <div className="h-[80%] flex-grow">
        <ChatArena />
      </div>

      <MessageInput recieverId={params.id} />
    </div>
  );
}
