"use client";

import ChatBody from "./chat-body";
import MessageInput from "./message-input";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/app/context/WebSocket";

interface TargetUser {
  email: string | null;
  name: string | null;
  avatar: string | null;
}

function Chat({ user }) {
  const [targetUser, setTargetUser] = useState<TargetUser>();
  const socket = useWebSocket();

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.type === "privateChat") {
      if (data.message.fromEmail === user.email) {
        setTargetUser(data.message.targetUser);
      }
    }
  };

  const handleJoinUser = () => {
    console.log("join user");
    const data = {
      type: "joinUser",
      message: {
        email: user.email,
        avatar: user.avatar,
        name: user.name,
      },
    };

    socket.send(JSON.stringify(data));
  };

  useEffect(() => {
    if (socket.readyState === WebSocket.OPEN) {
      // Connection is already open
      handleJoinUser();
    } else {
      // Register the event listener
      socket.addEventListener("open", handleJoinUser);
    }

    return () => {
      socket.removeEventListener("open", handleJoinUser);
    };
  }, []);

  useEffect(() => {
    socket.addEventListener("message", handleMessage);
  }, []);

  // useEffect(() => {
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  return (
    <div className="h-[100vh] w-full flex flex-row">
      <Sidebar user={user} />

      <div className="w-full border rounded ">
        {targetUser ? (
          <div className="flex flex-col h-full">
            <div>
              <ChatBody user={user} targetUser={targetUser} />
            </div>
            <div className="mt-auto ">
              <MessageInput user={user} targetUser={targetUser} />
            </div>
          </div>
        ) : (
          <div className="flex h-full justify-center items-center">
            <h1>select user</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
