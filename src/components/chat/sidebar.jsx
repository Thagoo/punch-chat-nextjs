import Search from "@/ui/search";
import { useSelector } from "react-redux";
import { selectSearchUser } from "@/lib/redux/features/searchUser/searchUserSlice";

import Contacts from "@/ui/contact-user";

export default function Sidebar() {
  const searchUser = useSelector(selectSearchUser);

  return (
    <div className="flex flex-col ">
      <Search placeholder="Search users" />

      {/* <ul>
        {" "}
        <Contacts contactUser={contacts} />
      </ul> */}

      <ul>
        {searchUser ? (
          searchUser.length == 0 ? (
            <div className="p-2">No results found</div>
          ) : (
            searchUser.map((user) => {
              return <Contacts contactUser={user} key={user._id} />;
            })
          )
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
