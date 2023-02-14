import { NextPage } from "next";
import LanguageIcon from "@mui/icons-material/Language";
import { useRouter } from "next/router";

interface Props {}

declare global {
  interface Window {
    umami: (eventName: string) => void;
  }
}

const ChangeLanguage: NextPage<Props> = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const changeLanguage = () => {
    router.push({ pathname, query }, asPath, {
      locale: locale === "th" ? "en" : "th",
    });
    if (typeof window !== "undefined") {
      window.umami(`change-language-${locale === "th" ? "en" : "th"}`);
    }
  };

  return (
    <div
      onClick={() => changeLanguage()}
      className="btn-outline btn-primary btn-sm btn gap-2 uppercase"
    >
      <LanguageIcon sx={{ width: 20 }} /> {locale === "th" ? "en" : "th"}
    </div>
  );
};

export default ChangeLanguage;
