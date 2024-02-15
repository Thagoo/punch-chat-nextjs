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
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search"
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
