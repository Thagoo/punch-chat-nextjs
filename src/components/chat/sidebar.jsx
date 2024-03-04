import Search from "@/ui/search";
import { useSelector } from "react-redux";
import { selectSearchUser } from "@/lib/redux/features/searchUser/searchUserSlice";

import ContactItem from "@/ui/contact-item";
import { selectConversations } from "@/lib/redux/features/chatSlice/chatSlice";
import { useEffect } from "react";

export default function Sidebar() {
  const searchUser = useSelector(selectSearchUser);
  const conversations = useSelector(selectConversations);

  return (
    <div className="flex flex-col ">
      <Search placeholder="Search users" />

      <ul>
        {searchUser ? (
          searchUser.length == 0 ? (
            <div className="p-2">No results found</div>
          ) : (
            searchUser.map((user) => {
              return <ContactItem targetUserDetails={user} key={user._id} />;
            })
          )
        ) : (
          <>
            {conversations.map((conversation) => {
              return (
                <ContactItem
                  conversation={conversation}
                  targetUserDetails={conversation?.targetUserDetails}
                  key={conversation.targetUserDetails?._id}
                />
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
