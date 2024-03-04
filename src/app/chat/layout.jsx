"use client";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import Sidebar from "@/components/chat/sidebar";

import { ChatSkeleton } from "@/ui/chat-skeleton";
import { useSession } from "next-auth/react";
import { UseDispatch } from "react-redux";
import {
  fetchConversations,
  selectActiveStatus,
} from "@/lib/redux/features/chatSlice/chatSlice";

export default function layout({ children }) {
  const dispatch = useDispatch();
  const activeStatus = useSelector(selectActiveStatus);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch({
      type: "WEBSOCKET_CONNECT",
      payload: "ws://localhost:8000/chat",
    });
  }, []);

  // [TODO] session makes multiple calls so this useEffect spams, check if
  // it does same on production

  useEffect(() => {
    dispatch({
      type: "WEBSOCKET_SEND",
      payload: {
        type: "JOIN",
        data: {
          userId: session?.user.id,
        },
      },
    });
    if (session?.user.id) {
      dispatch(fetchConversations(session?.user.id));
    }
  }, [session]);

  if (activeStatus) {
    return (
      <div className="flex flex-grow h-[80%] ">
        <div className="w-[30%] hidden md:block border rounded ">
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
