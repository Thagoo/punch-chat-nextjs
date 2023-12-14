"use client";

import { WebSocketProvider } from "../context/WebSocket";
import VideoChat from "../ui/video-chat/video-chat";

function Page() {
  return (
    <WebSocketProvider>
      <VideoChat />
    </WebSocketProvider>
  );
}

export default Page;
