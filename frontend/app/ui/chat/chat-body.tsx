"use client";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/app/context/WebSocket";
import { IMessageData } from "@/app/lib/definitions";

interface TargetUser {
  email: string | null;
  name: string | null;
  avatar: string | null;
}

function ChatBody({ user, targetUser }) {
  const [messages, setMessages] = useState<IMessageData[]>();
  const [filteredMessages, setFilteredMessages] = useState<IMessageData[]>();

  const socket = useWebSocket();

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "message") {
      setMessages((prev) => [...(prev ?? []), data.message]);
    }
  };

  useEffect(() => {
    socket.addEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    setFilteredMessages(
      messages?.filter(
        (message) =>
          message.email == targetUser.email ||
          message.toEmail == targetUser.email
      )
    );
  }, [messages, targetUser]);

  return (
    <>
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={targetUser?.avatar}
          alt="avatar"
        />
        <span className="block ml-2 font-bold text-gray-600">
          {targetUser?.name}
        </span>
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>
      <div className="relative w-full p-6 overflow-y-auto h-full flex-grow">
        <ul className="space-y-2">
          {filteredMessages?.map((message) => (
            <li
              className={`flex ${
                message.email === user.email ? `justify-end` : `justify-start`
              }`}
            >
              <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span>{message.message}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ChatBody;
