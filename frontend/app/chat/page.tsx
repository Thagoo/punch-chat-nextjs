import { WebSocketProvider } from "../context/WebSocket";
import Chat from "../ui/chat/chat";

function Page() {
  return (
    <div>
      <WebSocketProvider>
        <Chat />
      </WebSocketProvider>
    </div>
  );
}

export default Page;
