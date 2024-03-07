import Search from "@/ui/search";
import { useSelector } from "react-redux";
import { selectSearchUser } from "@/lib/redux/features/searchUser/searchUserSlice";

import ContactItem from "@/ui/contact-item";
import {
  fetchConversations,
  selectConversations,
  selectMessages,
} from "@/lib/redux/features/chatSlice/chatSlice";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

export default function Sidebar() {
  const searchUser = useSelector(selectSearchUser);
  const conversations = useSelector(selectConversations);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  console.log(conversations);
  useEffect(() => {
    dispatch(fetchConversations());
  }, [messages]);

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
            {conversations ? (
              conversations.map((conversation) => {
                return (
                  <ContactItem
                    conversation={conversation}
                    targetUserDetails={conversation?.targetUserDetails}
                    key={conversation.targetUserDetails?._id}
                  />
                );
              })
            ) : (
              <div className="mt-4 flex justify-center text-xl text-slate-700">
                No conversations
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
