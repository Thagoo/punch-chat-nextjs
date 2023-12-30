"use client";
import React, { ReactNode, createContext, useContext } from "react";

interface WebSocketContextType extends WebSocket {}
interface WebSocketProviderProps {
  children: ReactNode;
}
const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  // Create a single WebSocket instance
  const socket = new WebSocket("ws://localhost:8080/ws");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const socket = useContext(WebSocketContext);
  if (!socket) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return socket;
};
