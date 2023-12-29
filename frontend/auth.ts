import NextAuth from "next-auth";
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
        token.email = user.email;
        token.avatar = user.avatar;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.email = token.email;
          session.user.avatar = token.avatar;
        }
      }

      return session;
    },
  },
});