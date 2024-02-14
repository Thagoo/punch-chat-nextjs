"use client";

import { searchUsers } from "@/lib/redux/features/searchUser/searchUserSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const dispatch = useDispatch();

  const handleSearch = useDebouncedCallback((term) => {
    dispatch(searchUsers(term));
  }, 2000);

  return (
    <div className="flex border border-gray-200 ">
      <input
        className="peer rounded-md  text-sm  py-2 px-4 outline-2 placeholder:text-gray-500"
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      <MagnifyingGlassIcon className="  text-gray-500 " />
    </div>
  );
}
