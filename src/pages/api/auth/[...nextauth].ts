import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";
import SignInService from "@/services/sign-in";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: 'ku-login',
        credentials: {
            username: {
                label: 'Username',
                type: 'text',
                placeholder: 'เช่น b63xxxxxxxx หรือ regxxx',
            },
            password: {
                label: 'Password',
                type: 'password',
                placeholder: 'รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี',
            },
        },
        async authorize(credentials, req) {
            const res = await SignInService({
                username: credentials!.username,
                password: credentials!.password,
            })
            console.log(res)
            // Return null if user data could not be retrieved
            return null
        },
    }),
  ],
};

export default NextAuth(authOptions);
