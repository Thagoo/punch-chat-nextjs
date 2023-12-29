import { UserProvider } from "../context/UserContext";
import { WebSocketProvider } from "../context/WebSocket";
import Chat from "../ui/chat/chat";
import { auth } from "@/auth";
async function Page() {
  const { user } = await auth();
  return (
    <div>
      <WebSocketProvider>
        <Chat user={user} />
      </WebSocketProvider>
    </div>
  );
}

export default Page;
