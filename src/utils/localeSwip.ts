const LocaleSwip = (locale: string, th: any, en: any) => {
  if (locale === "th") {
    return th;
  } else {
    return en;
  }
};

export default LocaleSwip;
