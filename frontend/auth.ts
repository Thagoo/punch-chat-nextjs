import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { connectToDB } from "./app/lib/db";
import { User } from "@/app/lib/models";
import z from "zod";
import bcrypt from "bcrypt";

const login = async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;

  try {
    connectToDB();
    const user = await User.findOne({ email: email });

    if (!user) {
      return {
        errors: { email: "Email doesn't exist" },
      };
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        errors: { password: "Password doesn't match" },
      };
    }

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
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        try {
          if (parsedCredentials.success) {
            const user = await login(parsedCredentials.data);
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
});
