"use client";

import { sendMessage } from "@/lib/redux/features/chatSlice/chatSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function MessageInput({ recieverId }) {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { data: session } = useSession();

  const handleMessage = (event) => {
    event.preventDefault();
    const data = {
      message: message,
      recieverId: recieverId,
      senderId: session.user.id,
    };
    dispatch(sendMessage(data));
    setMessage("");
  };

  return (
    <form onSubmit={handleMessage}>
      <div className="flex w-full rounded-md border border-gray-200 bg-slate-300">
        <input
          className="peer block h-12 w-full  outline-none p-4 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Type here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <button type="submit">
          <PaperAirplaneIcon className="h-12 w-10 bg-white text-gray-500  peer-focus:text-gray hover:text-gray-600" />
        </button>
      </div>
    </form>
  );
}
