import { NextComponentType } from "next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ChangeLanguage from "@/components/ChangeLanguage";
import LocaleSwip from "@/utils/localeSwip";
import clsx from "clsx";
import Alert from "@/components/Alert";

const ThemeSwich = dynamic(() => import("@/components/ThemeSwich"), {
  ssr: false,
});

interface Props {}

const Index: NextComponentType<Props> = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { data: session, status } = useSession();

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameRef.current || !passwordRef.current) {
      return;
    }

    try {
      setIsLoading(true);
      await signIn("credentials", {
        username: usernameRef.current.value!,
        password: passwordRef.current.value!,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <>
      <div className="absolute top-0 right-0 left-0 z-20 mx-auto flex max-w-md items-center justify-between p-5">
        <ChangeLanguage />
        <ThemeSwich />
      </div>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-10 flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="mx-auto flex w-full max-w-md flex-col gap-5 px-5"
        >
          <h1 className="text-4xl font-bold">
            {LocaleSwip(router.locale!, "เข้าสู่ระบบ", "Sign In")}
          </h1>
          <div className="flex flex-col gap-2">
            <div>{LocaleSwip(router.locale!, "ชื่อผู้ใช้", "Username")}</div>
            <input
              ref={usernameRef}
              type="text"
              placeholder="เช่น b63xxxxxxxx หรือ regxxx"
              className="input-bordered input-primary input w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>{LocaleSwip(router.locale!, "รหัสผ่าน", "Password")}</div>
            <div className="relative">
              <div className="absolute right-0 top-0 bottom-0 flex h-full flex-col justify-center px-5">
                {showPass ? (
                  <AiFillEyeInvisible
                    onClick={() => setShowPass(false)}
                    className="cursor-pointer text-base-content hover:text-base-content/50"
                    size={"20"}
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setShowPass(true)}
                    className="cursor-pointer text-base-content hover:text-base-content/50"
                    size={"20"}
                  />
                )}
              </div>
              <input
                ref={passwordRef}
                type={showPass ? "text" : "password"}
                placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
                className="input-bordered input-primary input w-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={clsx("btn-primary btn", isLoading ? "loading" : "")}
          >
            {LocaleSwip(router.locale!, "เข้าสู่ระบบ", "SignIn")}
          </button>
        </form>
      </div>
    </>
  );
};

export default Index;
