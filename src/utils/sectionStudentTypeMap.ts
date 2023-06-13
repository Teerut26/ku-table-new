const sectionStudentTypeMap = [
  {
    key: "Regular",
    th: "ปกติ",
    en: "Regular",
  },
  {
    key: "Special",
    th: "พิเศษ",
    en: "Special",
  },
];

const convertKeyToSectionStudentType = (key: string) => {
  return sectionStudentTypeMap.find((type) => type.key === key);
};

export { sectionStudentTypeMap, convertKeyToSectionStudentType };
