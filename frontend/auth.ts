import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { connectToDB } from "./app/lib/db";
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
        try {
          const user = await login(email, password);

          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
});
