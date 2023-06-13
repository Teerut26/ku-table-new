const sectionTypeMap = [
  {
    key: "Lecture",
    th: "บรรยาย",
    en: "Lecture",
  },
  {
    key: "Laboratory",
    th: "ปฏิบัติ",
    en: "Laboratory",
  },
];

const convertKeyToSectionType = (key: string) => {
  return sectionTypeMap.find((type) => type.key === key);
};

export { sectionTypeMap, convertKeyToSectionType };
