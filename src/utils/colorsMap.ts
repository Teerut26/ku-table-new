const colorsMap = [
  {
    key: "MON",
    color: "yellow",
    textHex: "#eb9c03",
    bgHex: "#fff2c4",
  },
  {
    key: "TUE",
    color: "pink",
    textHex: "#c7117f",
    bgHex: "#fdd8ee",
  },
  {
    key: "WED",
    color: "green",
    textHex: "#4b991c",
    bgHex: "#d1feb6",
  },
  {
    key: "THU",
    color: "orange",
    textHex: "#eb9c03",
    bgHex: "#fff2c4",
  },
  {
    key: "FRI",
    color: "blue",
    textHex: "#0c5a93",
    bgHex: "#daeffe",
  },
  {
    key: "SAT",
    color: "purple",
    textHex: "#681a83",
    bgHex: "#f3d6fd",
  },
  {
    key: "SUN",
    color: "red",
    textHex: "#c7117f",
    bgHex: "#fdd8ee",
  },
];


const convertKeyToColor = (key: string) => {
    return colorsMap.find((day) => day.key === key);
}

export { colorsMap, convertKeyToColor };