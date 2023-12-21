import { Elysia, t } from "elysia";
import { logger } from "@grotto/logysia";
import { userActive, userEmails } from "./utils";

let users = [];
let clients = new Map();

const app = new Elysia();
app.ws("/ws", {
  async open(ws) {
    console.log("open");
    ws.subscribe("chat");
  },
  async message(ws, message) {
    console.log(message);

    if (message.type === "joinUser") {
      const active = await userActive(users, message.email);
      console.log(active);
      if (active == false) {
        ws.data.email = message.email;
        users.push(ws);
        let emails = userEmails(users);
        const data = {
          type: "activeUsers",
          emails,
        };
        ws.send(JSON.stringify(data));
        ws.publish("chat", JSON.stringify(data));
      }
    }
    if (message.type === "privateChat") {
      const privateUsers = [message.message.fromEmail, message.message.toEmail];

      users.map((user) => {
        if (privateUsers.includes(user.data.email)) {
          user.send(message);
        }
      });
    }
    if (message.type === "message") {
      ws.subscribe("chat");
      ws.publish("chat", message);
      ws.send(message);
    }
  },
});

app.use(logger());
app.listen(8080);
