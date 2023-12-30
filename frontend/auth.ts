import NextAuth, { JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

import { connectToDB } from "./app/lib/utils";
import { User } from "@/app/lib/models";
import z from "zod";
import bcrypt from "bcrypt";

const login = async (email: string | unknown, password: string | unknown) => {
  try {
    await connectToDB();
    const user = await User.findOne({ email: email });

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password }: typeof credentials = credentials;
        const user = await login(email, password);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.name = user.email;
        token.email = user.email;
        token.avatar = user.avatar;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const typedToken = token as unknown as JWT;
        if (session.user) {
          session.user.id = typedToken.id;
          session.user.name = typedToken.name;
          session.user.email = typedToken.email;
          session.user.avatar = typedToken.avatar;
          session.user.isAdmin = typedToken.isAdmin;
        }
      }

      return session;
    },
  },
});
