"use client";
import React, { Suspense, useEffect, useState } from "react";
import MessageInput from "@/components/chat/message-input";
import Image from "next/image";
import { useSelector } from "react-redux";
import ChatArena from "@/components/chat/chat-arena";
import ChatHeader from "@/components/chat/chat-header";
import ChatSkeleton from "@/ui/chat-skeleton";
import LoadingSpinner from "@/ui/loading-spinner";
import {
  fetchConversations,
  fetchMessages,
  fetchUser,
  selectConversations,
  selectCurrentConversation,
  selectMessages,
  setCurrentConversation,
} from "@/lib/redux/features/chatSlice/chatSlice";
import { useDispatch } from "react-redux";

export default function Page({ params }) {
  const conversations = useSelector(selectConversations);
  const currentConvo = useSelector(selectCurrentConversation);
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    if (conversations.length > 0) {
      conversations.map((conversation) => {
        if (conversation.targetUserDetails) {
          if (conversation.targetUserDetails._id == params.id) {
            dispatch(setCurrentConversation(conversation));
          } else {
            dispatch(fetchUser(params.id));
          }
        }
      });
    } else {
      dispatch(fetchUser(params.id));
    }
  }, [params.id]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [currentConvo]);

  if (currentConvo == "loading") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LoadingSpinner height={30} width={30} />
      </div>
    );
  }
  if (currentConvo) {
    return (
      <div className="w-full  flex flex-col border rounded">
        <div>
          <ChatHeader currentConvo={currentConvo} />
        </div>

        <div className="h-[80%] flex-grow">
          <ChatArena recieverId={params.id} messages={messages} />
        </div>

        <MessageInput recieverId={params.id} />
      </div>
    );
  }
}
