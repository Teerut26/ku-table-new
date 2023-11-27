const findCourseYear = (year: string): string => {
  const p1s = year.slice(0, 1);
  const p2s = year.slice(1, 2);
  const p1 = Number.parseInt(year.slice(0, 1));
  const p2 = Number.parseInt(year.slice(1, 2));

  if (p2 < 5 && p2 >= 0) {
    return p1s + "0";
  } else {
    return p1s + "5";
  }
};

export default findCourseYear;
