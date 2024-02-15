import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Contacts({ contactUser }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`rounded-sm py-2 text-sm hover:bg-gray-100 ${
          pathname.includes(contactUser.id) ? "bg-gray-100" : "bg-white"
        }`}
      >
        <li>
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
                <p className="text-xs text-slate-800">
                  @{contactUser.username}
                </p>
              </div>
              <span
                class={`flex w-3 h-3 me-3 ${
                  contactUser.isActive ? "bg-green-500" : "bg-red-500"
                } rounded-full`}
              ></span>
            </div>
          </Link>
        </li>
      </div>
    </>
  );
}
