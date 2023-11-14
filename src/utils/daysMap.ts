const DaysMap = [
  {
    th: "จันทร์",
    en: "Monday",
    key: "MON",
    value: 1,
  },
  {
    th: "อังคาร",
    en: "Tuesday",
    key: "TUE",
    value: 2,
  },
  {
    th: "พุธ",
    en: "Wednesday",
    key: "WED",
    value: 3,
  },
  {
    th: "พฤหัสบดี",
    en: "Thursday",
    key: "THU",
    value: 4,
  },
  {
    th: "ศุกร์",
    en: "Friday",
    key: "FRI",
    value: 5,
  },
  {
    th: "เสาร์",
    en: "Saturday",
    key: "SAT",
    value: 6,
  },
  {
    th: "อาทิตย์",
    en: "Sunday",
    key: "SUN",
    value: 7,
  },
];

const convertKeyToDate = (key: string) => {
  return DaysMap.find((day) => day.key === key);
};

export { DaysMap, convertKeyToDate };
