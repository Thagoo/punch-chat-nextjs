"use client";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/app/context/WebSocket";
import { IMessageData } from "@/app/lib/definitions";

function ChatBody({ user }) {
  const [messages, setMessages] = useState<IMessageData[]>();
  const [targetUser, setTargetUser] = useState("");
  const socket = useWebSocket();

  const socketInitialize = async () => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setMessages((prev) => [...(prev ?? []), data.message]);
      } else if (data.type == "privateChat") {
        console.log("test");
        setTargetUser(data.message.toEmail);
      }

      return () => {
        socket.close();
      };
    };
  };
  const handleJoinUser = () => {
    const data = {
      type: "joinUser",
      email: user.email,
    };
    socket.send(JSON.stringify(data));
  };
  useEffect(() => {
    socketInitialize();
  }, []);

  return (
    <>
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          alt="username"
        />
        <span className="block ml-2 font-bold text-gray-600">{targetUser}</span>
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>
      <div className="relative w-full p-6 overflow-y-auto h-full flex-grow">
        <button onClick={handleJoinUser}>Join</button>
        <ul className="space-y-2">
          {messages?.map((message) => (
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
