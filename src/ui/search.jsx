"use client";

import {
  searchUsers,
  setSearchUser,
} from "@/lib/redux/features/searchUser/searchUserSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const dispatch = useDispatch();
  const [showClear, setShowClear] = useState(false);

  const inputRef = useRef();

  const handleSearch = useDebouncedCallback((term) => {
    setShowClear(true);
    if (term.length > 2) {
      dispatch(searchUsers(term));
    }
  }, 1000);

  const handleClear = () => {
    inputRef.current.value = "";
    setShowClear(false);
    dispatch(setSearchUser(null));
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search username
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        ref={inputRef}
        placeholder="Search Username"
      />
      {showClear && (
        <XMarkIcon
          onClick={handleClear}
          className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
        />
      )}

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
