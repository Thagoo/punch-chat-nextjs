"use client";

import { useContext, useEffect, useState } from "react";
import MessageInput from "./message-input";
import Sidebar from "./sidebar";
import { useWebSocket } from "@/app/context/WebSocket";

interface MessageData {
  message: string;
  username: string | null;
  time: string | null;
}
function Chat() {
  const [messages, setMessages] = useState<MessageData[]>();
  const socket = useWebSocket();

  const socketInitialize = () => {
    socket.onmessage = (event) => {
      const data: MessageData = {
        // double serializing because of extra single quote around double-quoted string issue
        message: JSON.parse(JSON.parse(event.data)),
      };

      setMessages((prev) => [...(prev ?? []), data]);

      return () => {
        socket.close();
      };
    };
  };
  useEffect(() => {
    socketInitialize();
  }, []);

  return (
    <div className=" w-full flex flex-row">
      <Sidebar />

      <div className="w-screen border rounded ">
        <div>
          <div className=" h-[80vh] w-full flex flex-col ">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">Emma</span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-full flex-grow">
              <ul className="space-y-2">
                <li className="flex justify-start">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span className="block">Hi</span>
                  </div>
                </li>
                <li className="flex justify-end">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block">Hiiii</span>
                  </div>
                </li>
                <li className="flex justify-end">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block"></span>
                  </div>
                </li>

                {messages?.map((message) => (
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span>{message.message}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto ">
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
