"use client";

import ChatBody from "./chat-body";
import MessageInput from "./message-input";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/app/context/WebSocket";
import { TargetUser, User } from "@/app/types/User";
import { auth } from "@/auth";
import { fetchUser } from "@/app/lib/data";
import { z } from "zod";

type UserInfoProps = {
  userDetails: User | undefined;
};
function Chat({ userDetails }: UserInfoProps) {
  const [targetUser, setTargetUser] = useState<TargetUser>();
  const socket = useWebSocket();

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);

    if (data.type === "privateChat") {
      if (data.payload.fromEmail === userDetails?.email) {
        setTargetUser(data.payload.targetUser);
      }
    }
  };

  const handleJoinUser = () => {
    const data = {
      type: "joinUser",
      payload: {
        email: userDetails?.email,
        avatar: userDetails?.avatar,
        name: userDetails?.name,
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
      <Sidebar user={userDetails} />

      <div className="w-full border rounded ">
        {targetUser ? (
          <div className="flex flex-col h-full">
            <div>
              <ChatBody user={userDetails} targetUser={targetUser} />
            </div>
            <div className="mt-auto ">
              <MessageInput user={userDetails} targetUser={targetUser} />
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
