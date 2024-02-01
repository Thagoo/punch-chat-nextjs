import Link from "next/link";
import Search from "@/ui/search";
import { useSelector } from "react-redux";
import {
  selectSearchResult,
  setSearchResult,
} from "@/lib/redux/features/searchUser/searchUserSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const searchResult = useSelector(selectSearchResult);
  const dispatch = useDispatch();

  const SearchResult = () => {
    return (
      <>
        <li
          className=" rounded-sm border border-gray-100 text-sm px-2 hover:bg-slate-100 "
          onClick={() => dispatch(setSearchResult(null))}
        >
          <Link href={`/chat/${searchResult.id}`}>
            <div className="flex items-center">
              <Image
                src={searchResult.avatar || "/assets/no-avatar.svg"}
                alt="avatar logo"
                width={50}
                height={24}
                className="rounded-full p-1 mr-2"
              />
              <div className="flex flex-col flex-grow">
                <p className="text-lg ">{searchResult.firstName}</p>
                <p className="text-xs text-slate-800">
                  @{searchResult.username}
                </p>
              </div>
              <span
                class={`flex w-3 h-3 me-3 ${
                  searchResult.isActive ? "bg-green-500" : "bg-red-500"
                } rounded-full`}
              ></span>
            </div>
          </Link>
        </li>
      </>
    );
  };

  return (
    <div className="flex flex-col ">
      <Search placeholder="Search users" />

      <ul className="mt-2 ">{searchResult && <SearchResult />}</ul>
    </div>
  );
}
