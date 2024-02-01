import React from "react";

export default function ChatSkeleton() {
  return (
    <div className="flex flex-grow h-[80%] ">
      <div className="w-full md:w-[25%] border rounded p-2">
        <div className="space-y-5 rounded-2xl bg-white/5 p-4 ">
          <div
            className="h-[50vh] rounded-lg bg-slate-400/10 relative 
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r *:
    before:from-transparent before:via-slate-400/10 before:to-transparent isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-rose-100/10"
          ></div>
          <div className="bg-gradient-to-r from-transparent via-slate-400/10 to-transparent  -translate-x-full animate-[shimmer_2s_infinite]"></div>
          <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-slate-400/10"></div>
            <div className="h-3 w-4/5 rounded-lg bg-slate-400/20"></div>
            <div className="h-3 w-2/5 rounded-lg bg-slate-400/20"></div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col border rounded p-2 ">
        <div className="space-y-5 rounded-2xl bg-white/5 p-4 ">
          <div
            className="h-[50vh] rounded-lg bg-slate-400/10 relative 
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r *:
    before:from-transparent before:via-slate-400/10 before:to-transparent isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-rose-100/10"
          ></div>
          <div className="bg-gradient-to-r from-transparent via-slate-400/10 to-transparent  -translate-x-full animate-[shimmer_2s_infinite]"></div>
          <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-slate-400/10"></div>
            <div className="h-3 w-4/5 rounded-lg bg-slate-400/20"></div>
            <div className="h-3 w-2/5 rounded-lg bg-slate-400/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
