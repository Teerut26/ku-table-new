const DaysMap = [
  {
    th: "จันทร์",
    en: "Monday",
    key: "MON",
  },
  {
    th: "อังคาร",
    en: "Tuesday",
    key: "TUE",
  },
  {
    th: "พุธ",
    en: "Wednesday",
    key: "WED",
  },
  {
    th: "พฤหัสบดี",
    en: "Thursday",
    key: "THU",
  },
  {
    th: "ศุกร์",
    en: "Friday",
    key: "FRI",
  },
  {
    th: "เสาร์",
    en: "Saturday",
    key: "SAT",
  },
  {
    th: "อาทิตย์",
    en: "Sunday",
    key: "SUN",
  },
];

const convertKeyToDate = (key: string) => {
  return DaysMap.find((day) => day.key === key);
};

export { DaysMap, convertKeyToDate };
