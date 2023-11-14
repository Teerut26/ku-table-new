import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { DaysMap } from "./daysMap";

const sortByDay = (courses: Course[]): Course[] => {
  const sortedItems = courses.sort((a, b) => {
    const dayA = DaysMap.find((day) => day.key === a.day_w.trim());
    const dayB = DaysMap.find((day) => day.key === b.day_w.trim());
    if (dayA && dayB) {
      return dayA.value - dayB.value;
    }
    return 0;
  });
  return sortedItems || [];
};

export default sortByDay;
