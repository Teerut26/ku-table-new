import { NextComponentType, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const WithCheckSession: NextPage<Props> = ({ children }) => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status]);
  
  return <>{children}</>;
};

export default WithCheckSession;
