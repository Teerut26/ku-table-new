import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { env } from "../../../env/server.mjs";
import SignInService from "@/services/sign-in";
import { UserKuInterface } from "@/interfaces/UserKuInterface.js";
import getRenewToken from "@/services/renewtoken";

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
        } catch (error: any) {
          console.log(error.response.data.message);

          throw new Error(error.response.data.message || "มีบางอย่างผิดพลาด");
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  callbacks: {
    async session({ session, user, token }) {
      const data = jwt_decode(session.user?.email?.accesstoken!) as UserKuInterface;

      if (data.exp < Date.now() / 1000) {
        return {} as any;
      }

      return {
        ...session,
      };
    },
    async jwt({ token, user, account, profile }) {
      const renewToken = await getRenewToken({
        renewtoken: (token as any).email.renewtoken as any,
      });
      return {
        ...token,
        email: {
          ...(token.email as any),
          accesstoken: renewToken.data.accesstoken,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
