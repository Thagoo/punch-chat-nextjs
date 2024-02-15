import Search from "@/ui/search";
import { useSelector } from "react-redux";
import { selectSearchUser } from "@/lib/redux/features/searchUser/searchUserSlice";

import Contacts from "@/ui/contact-user";

export default function Sidebar() {
  const searchUser = useSelector(selectSearchUser);

  return (
    <div className="flex flex-col ">
      <Search placeholder="Search users" />

      <ul>{searchUser && <Contacts contactUser={searchUser} />}</ul>
    </div>
  );
}
