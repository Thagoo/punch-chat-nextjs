import { UserProvider } from "../context/UserContext";
import { WebSocketProvider } from "../context/WebSocket";
import Chat from "../ui/chat/chat";

async function Page() {
  return (
    <div>
      <WebSocketProvider>
        <Chat />
      </WebSocketProvider>
    </div>
  );
}

export default Page;
