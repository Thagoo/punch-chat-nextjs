"use client";
import { selectMessages } from "@/lib/redux/features/chatSlice/chatSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ChatArena() {
  const messages = useSelector(selectMessages);
  console.log("messages", messages);
  return (
    <div className="relative w-full h-full p-6 overflow-x-hidden overflow-y-auto">
      <ul className="space-y-2 ">
        {/* {messages?.map((message) => (
          <>
            <li className="flex  justify-start ">
              <div className="relative max-w-md break-words px-4 py-2 bg-slate-800  text-white rounded shadow">
                <p>{message.content}</p>
              </div>
            </li>
            <li className="flex  justify-end">
              <div className="relative max-w-md break-words  px-4 py-2 text-gray-900 rounded shadow">
                <span>{message.content}</span>
              </div>
            </li>
          </>
        ))} */}
      </ul>
    </div>
  );
}
