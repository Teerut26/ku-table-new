import dayjs from "dayjs";

const timeMap = [
  {
    dayjs: dayjs("06:00", "HH:mm"),
    label: "06:00",
  },
  {
    dayjs: dayjs("06:30", "HH:mm"),
    label: "06:30",
  },
  {
    dayjs: dayjs("07:00", "HH:mm"),
    label: "07:00",
  },
  {
    dayjs: dayjs("07:30", "HH:mm"),
    label: "07:30",
  },
  {
    dayjs: dayjs("08:00", "HH:mm"),
    label: "08:00",
  },
  {
    dayjs: dayjs("08:30", "HH:mm"),
    label: "08:30",
  },
  {
    dayjs: dayjs("09:00", "HH:mm"),
    label: "09:00",
  },
  {
    dayjs: dayjs("09:30", "HH:mm"),
    label: "09:30",
  },
  {
    dayjs: dayjs("10:00", "HH:mm"),
    label: "10:00",
  },
  {
    dayjs: dayjs("10:30", "HH:mm"),
    label: "10:30",
  },
  {
    dayjs: dayjs("11:00", "HH:mm"),
    label: "11:00",
  },
  {
    dayjs: dayjs("11:30", "HH:mm"),
    label: "11:30",
  },
  {
    dayjs: dayjs("12:00", "HH:mm"),
    label: "12:00",
  },
  {
    dayjs: dayjs("12:30", "HH:mm"),
    label: "12:30",
  },
  {
    dayjs: dayjs("13:00", "HH:mm"),
    label: "13:00",
  },
  {
    dayjs: dayjs("13:30", "HH:mm"),
    label: "13:30",
  },
  {
    dayjs: dayjs("14:00", "HH:mm"),
    label: "14:00",
  },
  {
    dayjs: dayjs("14:30", "HH:mm"),
    label: "14:30",
  },
  {
    dayjs: dayjs("15:00", "HH:mm"),
    label: "15:00",
  },
  {
    dayjs: dayjs("15:30", "HH:mm"),
    label: "15:30",
  },
  {
    dayjs: dayjs("16:00", "HH:mm"),
    label: "16:00",
  },
  {
    dayjs: dayjs("16:30", "HH:mm"),
    label: "16:30",
  },
  {
    dayjs: dayjs("17:00", "HH:mm"),
    label: "17:00",
  },
  {
    dayjs: dayjs("17:30", "HH:mm"),
    label: "17:30",
  },
  {
    dayjs: dayjs("18:00", "HH:mm"),
    label: "18:00",
  },
  {
    dayjs: dayjs("18:30", "HH:mm"),
    label: "18:30",
  },
  {
    dayjs: dayjs("19:00", "HH:mm"),
    label: "19:00",
  },
  {
    dayjs: dayjs("19:30", "HH:mm"),
    label: "19:30",
  },
  {
    dayjs: dayjs("20:00", "HH:mm"),
    label: "20:00",
  },
  {
    dayjs: dayjs("20:30", "HH:mm"),
    label: "20:30",
  },
  {
    dayjs: dayjs("21:00", "HH:mm"),
    label: "21:00",
  },
  {
    dayjs: dayjs("21:30", "HH:mm"),
    label: "21:30",
  },
  {
    dayjs: dayjs("22:00", "HH:mm"),
    label: "22:00",
  },
];

const isTimeInRanges = (timeFrom1: string, timeTo1: string, timeFrom2:string,timeTo2: string) => {
    const timeFrom1Dayjs = dayjs(timeFrom1, "HH:mm");
    const timeTo1Dayjs = dayjs(timeTo1, "HH:mm");
    const timeFrom2Dayjs = dayjs(timeFrom2, "HH:mm");
    const timeTo2Dayjs = dayjs(timeTo2, "HH:mm");
    return (
        timeFrom1Dayjs.isBefore(timeTo2Dayjs) &&
        timeFrom2Dayjs.isBefore(timeTo1Dayjs)
    );
}

export { timeMap, isTimeInRanges };
