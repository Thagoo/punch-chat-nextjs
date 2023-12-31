import { Context, Elysia } from "elysia";
import { logger } from "@grotto/logysia";
import { ActiveUsersData, IActiveUser, Message } from "./types/types";
import { ElysiaWS } from "elysia/dist/ws";
import { ServerWebSocket, WebSocketHandler } from "bun";

let activeUsers: Record<string, IActiveUser> = {};
interface Clients {
  [email: string]: ServerWebSocket;
}
let clients: Clients = {};

interface TWebSocket extends ServerWebSocket {
  email: string;
}
const app = new Elysia();
app.ws("/ws", {
  async open(ws) {
    ws.subscribe("chat");
    console.log("connection open", ws.id);
  },
  async message(ws, request) {
    const data = request as Message;
    console.log(data);
    if (data.type === "joinUser") {
      const user = data.payload as IActiveUser;

      if (!clients[user.email]) {
        clients[user.email] = ws;
        ws.data.email = user.email;
        activeUsers[user.email] = user;

        const response: ActiveUsersData = {
          type: "activeUsers",
          payload: Object.values(activeUsers),
        };

        ws.publish("chat", JSON.stringify(response));
        ws.send(JSON.stringify(response));
      }
    }

    if (data.type === "privateChat") {
      ws.send(data);
    }

    if (data.type === "message" && data.payload.toEmail) {
      ws.send(data);
      const toEmail = data.payload.toEmail;

      if (clients[toEmail]) {
        clients[toEmail].send(data);
      }
    }
  },
  close(ws) {
    const userEmail = ws.data.email;
    delete clients[userEmail];
    delete activeUsers[userEmail];
  },
});

app.use(logger());
app.listen(8080);
