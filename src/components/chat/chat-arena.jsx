import LoadingSpinner from "@/ui/loading-spinner";

export default function ChatArena({ recieverId, messages }) {
  if (messages == "loading") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LoadingSpinner height={30} width={30} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full p-6 overflow-x-hidden overflow-y-auto">
      <ul className="space-y-2 ">
        {messages &&
          messages.length > 0 &&
          messages?.map((message) => (
            <>
              <li
                className={`flex ${
                  recieverId !== message.senderId
                    ? "justify-end"
                    : "justify-start"
                } `}
              >
                <div className="relative max-w-md break-words px-4 py-2 bg-slate-800  text-white rounded shadow">
                  <p>{message.content}</p>
                </div>
              </li>
            </>
          ))}
      </ul>
    </div>
  );
}
