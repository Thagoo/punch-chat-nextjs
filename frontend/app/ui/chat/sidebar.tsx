"use client";
import { useWebSocket } from "@/app/context/WebSocket";
import { UserInfoProps } from "@/app/types/User";
import { useEffect, useState } from "react";

type ActiveUser = {
  email: string | null;
  name: string | null;
  avatar: string | null;
};

const Sidebar = ({ user }: UserInfoProps) => {
  const socket = useWebSocket();

  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>();

  const handleMessage = async (event: MessageEvent) => {
    const data = JSON.parse(event.data);

    if (data.type == "activeUsers") {
      const users = data.message.filter(
        (activeUser: ActiveUser) => activeUser.email !== user?.email
      );
      setActiveUsers(users);
    }
  };

  const handlePrivateChat = (targetUser: Object) => {
    const data = {
      type: "privateChat",
      message: {
        targetUser,
        fromEmail: user?.email,
      },
    };
    socket.send(JSON.stringify(data));
  };
  useEffect(() => {
    socket.addEventListener("message", handleMessage);
  }, []);
  useEffect(() => {}, [activeUsers]);

  return (
    <div className="w-[20rem] md:block">
      <div className=" w-full overflow-y-auto h-full bg-gray-100 ">
        <div className="relative flex items-center justify-center border-b border-gray-300">
          <span className="block ml-2 font-bold p-5 text-gray-600">Active</span>
        </div>

        <ul>
          {activeUsers?.map((user) => (
            <button
              className="w-full p-4 bg-white hover:bg-gray-50"
              onClick={() => handlePrivateChat(user)}
            >
              {user?.email}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
