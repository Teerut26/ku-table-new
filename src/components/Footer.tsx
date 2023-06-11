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
          <Link href="/report" className="underline text-info">{LocalsSwip("รายงานปัญหา", "Report")}</Link>
          <a href="https://github.com/Teerut26/ku-table-new">
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
