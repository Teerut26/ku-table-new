import { NextPage } from "next";
import GitHubIcon from "@mui/icons-material/GitHub";

interface Props {}

const Footer: NextPage<Props> = () => {
  return (
    <>
      <footer className="footer items-center p-4 text-neutral-content">
        <div className="grid-flow-col gap-4 justify-self-center">
          <a href="https://github.com/Teerut26/ku-table-new">
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
