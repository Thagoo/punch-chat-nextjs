import { auth } from "@/auth";
import { WebSocketProvider } from "../context/WebSocket";
import Chat from "../ui/chat/chat";

async function Page() {
  const session = await auth();

  return (
    <div>
      <WebSocketProvider>
        <Chat userDetails={session?.user} />
      </WebSocketProvider>
    </div>
  );
}

export default Page;
