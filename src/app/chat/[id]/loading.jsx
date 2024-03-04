import ChatSkeleton from "@/ui/chat-skeleton";
import LoadingSpinner from "@/ui/loading-spinner";
import React from "react";

function loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <LoadingSpinner height={30} width={30} />
    </div>
  );
}

export default loading;
