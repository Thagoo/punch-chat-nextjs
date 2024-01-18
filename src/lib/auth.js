import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { User } from "./models";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email } = credentials;
        // user is already authenticated before signIn
        const user = await User.findOne({ email: email });
        if (user) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.avatar = user.avatar;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id;
          session.user.firstName = token.firstName;
          session.user.lastName = token.lastName;
          session.user.email = token.email;
          session.user.avatar = token.avatar;
          session.user.isAdmin = token.isAdmin;
        }
      }

      return session;
    },
  },
});
