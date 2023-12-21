"use client";
import { useWebSocket } from "@/app/context/WebSocket";
import { useEffect, useState } from "react";

const Sidebar = ({ user }) => {
  const socket = useWebSocket();

  const [emails, setEmails] = useState<string[]>();

  const handleMessage = async (event) => {
    const data = JSON.parse(event.data);

    if (data.type == "activeUsers") {
      const newEmails = data.emails;

      const removeCurrentUser = newEmails.filter(
        (email) => email !== user.email
      );
      console.log(removeCurrentUser);
      setEmails(removeCurrentUser);
    }
    return () => {
      socket.close();
    };
  };

  const handlePrivateChat = (toEmail: string) => {
    const data = {
      type: "privateChat",
      message: {
        toEmail: toEmail,
        fromEmail: user.email,
      },
    };
    socket.send(JSON.stringify(data));
  };

  useEffect(() => {
    socket.addEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-[20rem] md:block">
      <div className=" w-full overflow-y-auto h-full bg-gray-100 ">
        <div className="relative flex items-center justify-center border-b border-gray-300">
          <span className="block ml-2 font-bold p-5 text-gray-600">Active</span>
        </div>

        <ul>
          {emails?.map((email) => (
            <button
              className="w-full p-4 bg-white hover:bg-gray-50"
              onClick={() => handlePrivateChat(email)}
            >
              {email}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
