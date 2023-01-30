import clsx from "clsx";
import { NextPage } from "next";
import { Kanit } from "@next/font/google";
import LocaleSwip from "@/utils/localeSwip";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import dynamic from "next/dynamic";
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
          <ThemeSwich />
          <div onClick={() => signOut()} className="btn-error btn-sm btn-outline btn gap-2 uppercase">
            <ExitToAppIcon sx={{width:20}} /> {LocaleSwip(locale!, "ออกจากระบบ", "Sign Out")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
