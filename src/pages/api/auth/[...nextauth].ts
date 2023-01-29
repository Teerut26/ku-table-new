import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { env } from "../../../env/server.mjs";
import SignInService from "@/services/sign-in";
import { UserKuInterface } from "@/interfaces/UserKuInterface.js";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "ku-login",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "เช่น b63xxxxxxxx หรือ regxxx",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await SignInService({
            username: credentials!.username,
            password: credentials!.password,
          });

          const user = {
            id: res.data.user.idCode,
            email: res.data as any,
            name: res.data.user.firstNameEn + " " + res.data.user.lastNameEn,
            image: "",
          };

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, user, token }) {
      const data = jwt_decode(
        session.user?.email?.accesstoken!
      ) as UserKuInterface;

        if (data.exp < Date.now() / 1000) {
          return {} as any;
        }
    //   session.expires = data.exp.toString();
      return session;
    },
    async jwt({ token, user, account }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
