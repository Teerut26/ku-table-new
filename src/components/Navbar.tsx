import clsx from "clsx";
import { NextPage } from "next";
import { Kanit } from "@next/font/google";
import LocaleSwip from "@/utils/localeSwip";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SignOut from "./SignOut";
const ThemeSwich = dynamic(() => import("@/components/ThemeSwich"), {
  ssr: false,
});

const kanit = Kanit({
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
});

interface Props {}

const Navbar: NextPage<Props> = () => {
  const { locale } = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className={clsx("text-2xl", kanit.className)}>
          {LocaleSwip(locale!, "ตารางเรียน", "Schedule")}
        </div>
        <div className="flex items-center gap-2">
          <SignOut />
          <ThemeSwich />
        </div>
      </div>
    </>
  );
};

export default Navbar;
