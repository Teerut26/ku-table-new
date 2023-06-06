import { useRouter } from "next/router";

export default function useLocalsSwip() {
  const { locale } = useRouter();

  const LocalsSwip = (th: string, en: string) => {
    return locale === "th" ? th : en;
  };

  return { LocalsSwip };
}
