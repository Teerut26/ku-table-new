import { NextPage } from "next";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import useLocalsSwip from "@/hooks/useLocalsSwip";

interface Props {}

const Footer: NextPage<Props> = () => {
  const { LocalsSwip } = useLocalsSwip();
  return (
    <>
      <footer className="footer items-center p-4 text-base-content">
        <div className="flex flex-col justify-self-center justify-center items-center">
          <Link href="https://www.instagram.com/teerut_1t/" target="_blank" className="underline text-info">รายงานปัญหาการใช้งานที่ Instragram</Link>
          <div>{process.env.NEXT_PUBLIC_BUILD_MESSAGE}</div>
          <a href="https://github.com/Teerut26/ku-table-new">
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
