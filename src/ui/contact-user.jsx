import Image from "next/image";
import Link from "next/link";

export const Contacts = ({ contactUser }) => {
  return (
    <>
      <li className="rounded-sm border border-gray-100 text-sm px-2 hover:bg-slate-100 active:bg-slate-100">
        <Link href={`/chat/${contactUser.id}`}>
          <div className="flex items-center">
            <Image
              src={contactUser.avatar || "/assets/no-avatar.svg"}
              alt="avatar logo"
              width={50}
              height={24}
              className="rounded-full p-1 mr-2"
            />
            <div className="flex flex-col flex-grow">
              <p className="text-lg ">{contactUser.firstName}</p>
              <p className="text-xs text-slate-800">@{contactUser.username}</p>
            </div>
            <span
              class={`flex w-3 h-3 me-3 ${
                contactUser.isActive ? "bg-green-500" : "bg-red-500"
              } rounded-full`}
            ></span>
          </div>
        </Link>
      </li>
    </>
  );
};
