import { Elysia } from "elysia";
import { logger } from "@grotto/logysia";
import { ActiveUsersData, IActiveUser, Message } from "./types/types";

import WebSocketHandler from "./WebsocketHandler";

const socket = new WebSocketHandler();

const app = new Elysia();
app.ws("/ws", {
  async open(ws) {
    ws.subscribe("chat");
    console.log("connection open", ws.id);
  },
  async message(ws, request) {
    const data = request as Message;

    if (data.type === "joinUser") {
      socket.handleJoinUser(ws, data);
    }
    if (data.type === "privateChat") {
      ws.send(data);
    }
    if (data.type === "message" && data.payload.toEmail) {
      socket.handlePrivateMessage(ws, data);
    }
  },
  close(ws) {
    socket.handleClose(ws);
  },
});

app.use(logger());
app.listen(8080);
