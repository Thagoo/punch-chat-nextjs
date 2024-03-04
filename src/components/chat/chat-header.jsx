import Image from "next/image";
import React from "react";

export default function ChatHeader() {
  const response = {
    avatar:
      "http://res.cloudinary.com/dzkxdyunu/image/upload/v1705855913/upload/bdhhsclbmsjq9dtsal81.png",
    firstName: "lohith",
  };
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <Image
        className="object-cover rounded-full bg-slate-200 "
        width={30}
        height={30}
        src={response?.avatar}
        alt="avatar"
      />
      <span className="block ml-2 font-bold text-gray-600">
        {response?.firstName}
      </span>
    </div>
  );
}
