"use client";
import {
  searchUsers,
  setSearchResult,
} from "@/lib/redux/features/searchUser/searchUserSlice";
import React, { Suspense, useEffect } from "react";

export default function Page({ params }) {
  return (
    <div className="w-full flex flex-col border rounded p-2 ">
      <Suspense
        fallback={
          <>
            <div>Loading </div>
          </>
        }
      >
        <div className="flex-grow">{params.id}</div>
        <div>input</div>
      </Suspense>
    </div>
  );
}
