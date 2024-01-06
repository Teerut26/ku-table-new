import { NextComponentType, NextPageContext } from "next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ChangeLanguage from "@/components/ChangeLanguage";
import LocaleSwip from "@/utils/localeSwip";
import clsx from "clsx";
import Alert from "@/components/Alert";
import { useCookies } from "react-cookie";
import { RSAEncrypt } from "@/utils/RSA";
import domainCheck from "@/utils/domainCheck";

const ThemeSwich = dynamic(() => import("@/components/ThemeSwich"), {
    ssr: false,
});

export async function getServerSideProps(context: NextPageContext) {
    const domain = context.req!.headers["host"];

    if (!domainCheck(domain!)) {
        return {
            redirect: {
                destination: "https://kugetreg.teerut.me",
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

interface Props { }

const Index: NextComponentType<Props> = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { data: session, status } = useSession();

    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(["store-data"]);
    const isStoreData = useRef(cookies["store-data"] ? true : false);

    const router = useRouter();

    useEffect(() => {
        console.log(router.domainLocales);

    }, [router])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!usernameRef.current || !passwordRef.current) {
            return;
        }

        try {
            setIsLoading(true);

            await signIn("credentials", {
                username: usernameRef.current.value!,
                password:
                    passwordRef.current.value == "password-by-cookie"
                        ? cookies["store-data"].password
                        : RSAEncrypt(passwordRef.current.value!),
            });

            if (
                isStoreData.current &&
                passwordRef.current.value != "password-by-cookie"
            ) {
                setCookie(
                    "store-data",
                    {
                        username: usernameRef.current.value!,
                        password: RSAEncrypt(passwordRef.current.value),
                    },
                    {
                        path: "/",
                        maxAge: 30 * 86400,
                    }
                );
            }

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

    const onChangeisStoreData = () => {
        isStoreData.current = !isStoreData.current;

        if (!isStoreData.current) {
            removeCookie("store-data", { path: "/" });

            if (passwordRef?.current?.value == "password-by-cookie") {
                passwordRef.current.value = "";
            }
        }
    };

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
                            defaultValue={cookies["store-data"]?.username}
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
                                defaultValue={isStoreData.current ? "password-by-cookie" : ""}
                                placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี "
                                className="input-bordered input-primary input w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="label cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked={isStoreData.current}
                                onChange={onChangeisStoreData}
                                className="checkbox checkbox-sm"
                            />
                        </label>
                        <span className="text-md">
                            {LocaleSwip(
                                router.locale!,
                                "บันทึกข้อมูลการเข้าสู่ระบบ",
                                "Remember me"
                            )}
                        </span>
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
