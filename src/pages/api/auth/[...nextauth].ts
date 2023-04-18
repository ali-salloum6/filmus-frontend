import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { decode } from "next-auth/jwt";
import { setCookie } from "typescript-cookie";

import CredentialsProvider from "next-auth/providers/credentials";

interface ICredentials {
  email: {
    label: string;
    type: string;
    placeholder: string;
  };
  password: {
    label: string;
    type: string;
  };
}
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "example@dom.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const body = {
          email: email,
          password: password,
        };

        const res = await fetch("http://localhost:4000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as ILoginResponse;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
