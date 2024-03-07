import { selectCurrentConversation } from "@/lib/redux/features/chatSlice/chatSlice";
import LoadingSpinner from "@/ui/loading-spinner";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function ChatHeader({ currentConvo }) {
  if (!currentConvo) {
    redirect("/chat");
  }

  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <Image
        className="object-cover rounded-full bg-slate-200 "
        width={30}
        height={30}
        src={currentConvo?.targetUserDetails?.avatar || "/assets/no-avatar.svg"}
        alt="avatar"
      />
      <span className="block ml-2 font-bold text-gray-600">
        {currentConvo?.targetUserDetails?.firstName}
      </span>
    </div>
  );
}
