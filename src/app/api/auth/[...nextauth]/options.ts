import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        // First time JWT callback is run, user object is available
        if (user && user.id && user.username) {
          token.id = user.id;
          token.username = user.username;
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token && token.id && token.username) {
          session.id = token.id;
          session.username = token.username;
        }
        return session;
      },
    },
    providers: [
      CredentialsProvider({
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials, req) {
          const response = await sql`
          SELECT * FROM users WHERE email=${credentials?.email}`;
          const user = response.rows[0];
  
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password
          );
          console.log({ passwordCorrect });
          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
              username: user.username,
            };
          }
          return null;
        },
      }),
    ],
  }