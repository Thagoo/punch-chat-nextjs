import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const currentUrl = nextUrl.pathname;

      if (currentUrl == "/") {
        return true;
      }
      if (currentUrl == "/login") {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
      }
      if (isLoggedIn) return true;
      return false;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
