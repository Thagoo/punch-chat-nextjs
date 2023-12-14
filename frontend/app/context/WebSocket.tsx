"use client";
import React, { createContext, useContext } from "react";

interface WebSocketContextType extends WebSocket {
  // Add any additional methods or properties you want to expose
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC = ({ children }) => {
  // Create a single WebSocket instance
  const socket = new WebSocket("ws://localhost:8080");

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
