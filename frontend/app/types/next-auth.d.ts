import NextAuth, { DefaultSession, User, JWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string | null;
      email: string | null;
      avatar: string | null;
      name: string | null;
      isAdmin: boolean | null;
    };
  }
  interface User extends User {
    _id: string | null;
    email: string | null;
    avatar: string | null;
    name: string | null;
    isAdmin: boolean | null;
  }
}

declare module "next-auth" {
  interface JWT extends JWT {
    id: string | null;
    email: string | null;
    avatar: string | null;
    name: string | null;
    isAdmin: boolean | null;
  }
}
