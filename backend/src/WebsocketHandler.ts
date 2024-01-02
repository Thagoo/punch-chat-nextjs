import { ServerWebSocket } from "bun";
import { ActiveUsersData, IActiveUser, Message } from "./types/types";

interface Clients {
  [email: string]: ServerWebSocket;
}
class WebSocketHandler {
  private activeUsers: Record<string, IActiveUser> = {};

  private clients: Clients = {};
  public handleJoinUser(ws: ServerWebSocket, data: Message) {
    const user = data.payload as IActiveUser;

    if (!this.clients[user.email]) {
      this.clients[user.email] = ws;
      ws.data.email = user.email;
      this.activeUsers[user.email] = user;

      const response: ActiveUsersData = {
        type: "activeUsers",
        payload: Object.values(this.activeUsers),
      };

      ws.publish("chat", JSON.stringify(response));
      ws.send(JSON.stringify(response));
    }
  }

  public handlePrivateMessage(ws: ServerWebSocket, data: Message) {
    ws.send(JSON.stringify(data));
    const toEmail = data.payload.toEmail;

    if (this.clients[toEmail]) {
      this.clients[toEmail].send(JSON.stringify(data));
    }
  }
  public handleClose(ws: ServerWebSocket) {
    const userEmail = ws.data.email;
    delete this.clients[userEmail];
    delete this.activeUsers[userEmail];

    const response: ActiveUsersData = {
      type: "activeUsers",
      payload: Object.values(this.activeUsers),
    };

    ws.publish("chat", JSON.stringify(response));
  }
}

export default WebSocketHandler;
