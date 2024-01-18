export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user?.email;
      const currentUrl = nextUrl.pathname;

      if (currentUrl == "/") {
        return true;
      }
      if (currentUrl == "/register") {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }
      if (currentUrl == "/login") {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
      }
      if (isLoggedIn) return true;
      return false;
    },
  },
  providers: [],
};
