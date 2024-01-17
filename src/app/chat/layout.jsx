import Sidebar from "@/components/chat/sidebar";

export const metadata = {
  title: "Punch Chat",
  description: "Punch Private Chat | Chat Room",
};

export default function page({ children }) {
  return (
    <div className="flex flex-grow h-[80%] ">
      <div className="w-full md:w-[25%] border rounded p-2">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
