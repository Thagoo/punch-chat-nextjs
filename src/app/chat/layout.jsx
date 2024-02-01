"use client";
import { useDispatch, useSelector } from "react-redux";

import {
  initializeWebSocket,
  selectWebSocket,
  handleMessage,
} from "@/lib/redux/features/websocket/websocketSlice";
import { useEffect } from "react";
import Sidebar from "@/components/chat/sidebar";

import ChatSkeleton from "@/ui/chat-skeleton";

export default function layout({ children }) {
  const dispatch = useDispatch();
  const socket = useSelector(selectWebSocket);

  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket("ws://localhost:8000/chat");

      socket.addEventListener("open", () => {
        dispatch(initializeWebSocket(socket));
      });

      if (socket.readyState === WebSocket.OPEN) {
        // Connection is already open
        dispatch(handleMessage("check"));
      } else {
        socket.addEventListener("open", () => {
          // dispatch(handleMessage("socket"));
        });
      }

      socket.addEventListener("close", () => {});

      return () => {
        socket.close();
      };
    }
  }, [dispatch]);

  if (socket) {
    return (
      <div className="flex flex-grow h-[80%] ">
        <div className="w-full md:w-[25%] border rounded p-1">
          <Sidebar />
        </div>
        {children}
      </div>
    );
  }

  return (
    <>
      <ChatSkeleton />
    </>
  );
}
