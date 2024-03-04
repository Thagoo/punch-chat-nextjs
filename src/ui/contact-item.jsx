import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ContactItem({ conversation, targetUserDetails }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <div
        className={`rounded-sm py-2 text-sm hover:bg-gray-300 ${
          pathname.includes(targetUserDetails?._id) ? "bg-gray-300" : "bg-white"
        }`}
      >
        <li>
          <Link href={`/chat/${targetUserDetails?._id}`}>
            <div className="flex items-center">
              <Image
                src={targetUserDetails?.avatar || "/assets/no-avatar.svg"}
                alt="avatar logo"
                width={60}
                height={24}
                className="rounded-full p-1 mr-2"
              />
              <div className="flex flex-col flex-grow">
                <p className="text-lg ">
                  {session?.user.id == targetUserDetails?._id
                    ? "You"
                    : targetUserDetails?.firstName}
                </p>
                {conversation ? (
                  ""
                ) : (
                  <p className="text-sm text-slate-600">
                    @{targetUserDetails?.username}
                  </p>
                )}
                <p className="text-md text-slate-500">
                  {conversation?.lastMessage}
                </p>
              </div>

              <span
                class={`flex w-3 h-3 me-3 ${
                  targetUserDetails?.isActive ? "bg-green-500" : "bg-red-500"
                } rounded-full`}
              ></span>
            </div>
          </Link>
        </li>
      </div>
    </>
  );
}
