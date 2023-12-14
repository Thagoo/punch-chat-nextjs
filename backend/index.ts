const server = Bun.serve({
  port: 8080,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed :(", { status: 500 });
  }, // upgrade logic

  websocket: {
    async message(ws, message) {
      console.log("Message was received from server:", message);

      try {
        const data = JSON.parse(message);
        console.log(data);
        // Broadcast the offer to all connected clients
        if (data.type === "offer") {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "offer", offer: data.offer }));
          }
        }
        ws.send(JSON.stringify(message));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    },

    open(ws) {
      console.log("Connection opened");
    }, // a socket is opened
    close(ws, code, message) {
      console.log("Connection closed");
    }, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
});
