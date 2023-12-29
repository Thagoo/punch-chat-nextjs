import { Elysia, t } from "elysia";
import { logger } from "@grotto/logysia";
import { userActive, userEmails } from "./utils";
import { IActiveUser } from "./utils/interfaces";

let activeUsers = {};

let clients = {};
const app = new Elysia();
app.ws("/ws", {
  async open(ws) {
    console.log("open");
    ws.subscribe("chat");
  },
  async message(ws, message) {
    console.log(message);

    if (message.type === "joinUser") {
      if (!clients[message.message.email]) {
        clients[message.message.email] = ws;
        ws.data.email = message.message.email;
        activeUsers[message.message.email] = message.message;
        const data = {
          type: "activeUsers",
          message: Object.values(activeUsers),
        };
        console.log("join user", activeUsers);
        ws.publish("chat", JSON.stringify(data));
        ws.send(JSON.stringify(data));
      }
    }
    if (message.type === "privateChat") {
      ws.send(message);
    }

    if (message.type == "message" && message.message.toEmail) {
      ws.send(message);
      clients[message.message.toEmail].send(message);
    }
  },
  close: (ws) => {
    delete clients[ws.data.email];
    delete activeUsers[ws.data.email];
    console.log("delete", clients);
  },
});

app.use(logger());
app.listen(8080);
