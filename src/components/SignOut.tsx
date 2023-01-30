import { NextPage } from "next";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";
import LocaleSwip from "@/utils/localeSwip";
import { useRouter } from "next/router";

interface Props {}

const SignOut: NextPage<Props> = () => {
  const { locale } = useRouter();
  return (
    <div
      onClick={() => signOut()}
      className="btn-outline btn-error btn-sm btn gap-2 uppercase"
    >
      <ExitToAppIcon sx={{ width: 20 }} />{" "}
      {LocaleSwip(locale!, "ออกจากระบบ", "Sign Out")}
    </div>
  );
};

export default SignOut;
