import { SignInServiceResponseInterface, User } from "@/interfaces/SignInServiceResponseInterface";
import { type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      email?: SignInServiceResponseInterface;
    };
  }

  interface JWT {
    email: SignInServiceResponseInterface;
  }
}
