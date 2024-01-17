import React, { Suspense } from "react";
import { fetchDummy } from "@/data";

export default async function Page({ params }) {
  const posts = await fetchDummy();

  return (
    <div className="w-full flex flex-col border rounded p-2 ">
      <Suspense
        fallback={
          <>
            <div>Loading suspends</div>
          </>
        }
      >
        <div className="flex-grow">{params.id}</div>
        <div>{posts.title}</div>
      </Suspense>
    </div>
  );
}
