import { auth } from "@/auth";

export const fetchUser = async () => {
  const { user } = await auth();
  return user;
};
