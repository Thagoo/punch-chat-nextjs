import { addMessage, saveMessage, setStatus } from "../chatSlice/chatSlice";

let socket = null;
const webSocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "WEBSOCKET_CONNECT": {
      socket = new WebSocket(action.payload);
      socket.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type == "STATUS") {
            store.dispatch(setStatus(data.connected));
          } else {
            store.dispatch(addMessage(data));
          }
        } catch (error) {
          console.error("Error parsing message data:", error);
        }
      });
      break;
    }
    case "WEBSOCKET_SEND": {
      if (socket !== null && socket.readyState === WebSocket.OPEN) {
        store.dispatch(saveMessage(action.payload.data));
        socket.send(JSON.stringify(action.payload));
      }
      break;
    }
    default:
      return next(action);
  }
};

export default webSocketMiddleware;
