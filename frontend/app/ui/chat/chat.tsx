import { auth } from "@/auth";
import ChatBody from "./chat-body";
import MessageInput from "./message-input";
import Sidebar from "./sidebar";

async function Chat() {
  const { user } = await auth();

  return (
    <div className="w-full flex flex-row">
      <Sidebar user={user} />
      <div className="w-screen border rounded ">
        <div>
          <div className=" h-[80vh] w-full flex flex-col ">
            <ChatBody user={user} />
          </div>
          <div className="mt-auto ">
            <MessageInput user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
