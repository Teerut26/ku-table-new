import { NextPage } from "next";
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from "next/router";

interface Props {}

const ChangeLanguage: NextPage<Props> = () => {
  const router = useRouter();
  const { pathname, asPath, query,locale } = router
  return (
    <div onClick={()=>router.push({ pathname, query }, asPath, { locale: locale === "th" ? "en" : "th" })} className="btn-outline btn-primary btn-sm btn gap-2 uppercase">
      <LanguageIcon sx={{width:20}} /> {locale === "th" ? "en" : "th"}
    </div>
  );
};

export default ChangeLanguage;
