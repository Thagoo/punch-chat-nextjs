import Elysia from "elysia";

const app = new Elysia();

app.ws("/ws", {
  open: (ws) => {
    console.log("test");
  },
  message: (ws, buffer) => {
    console.log(buffer);
  },
});

app.listen(3001);
