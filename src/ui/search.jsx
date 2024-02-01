"use client";

import { searchUsers } from "@/lib/redux/features/searchUser/searchUserSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }) {
  const dispatch = useDispatch();

  const handleSearch = useDebouncedCallback((term) => {
    dispatch(searchUsers(term));
  }, 3000);

  return (
    <div className="flex  ">
      <input
        className="peer rounded-md border border-gray-200 text-sm  py-2 px-3 outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      <MagnifyingGlassIcon className=" h-[16px] w-[16px]  text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
