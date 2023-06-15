import { Course } from "@/interfaces/GroupCourseResponseInterface";
import dayjs from "dayjs";

interface CourseInput {
  day_w: string;
  time_from: string;
  time_to: string;
}

const toMinute = (time: string): number => {
  return dayjs(time.trim(), "HH:mm").diff(dayjs("00:00", "HH:mm"), "minute");
};

const checkTimeConflict = (
  course: CourseInput,
  courseAll: Course[]
): Course[] => {
  try {
    let conflicts: Course[] = [];

    const courseStartTime = toMinute(course.time_from); // Convert string to number
    const courseEndTime = toMinute(course.time_to); // Convert string to number

    for (const c of courseAll) {
      const cStartTime = toMinute(c.time_from); // Convert string to number
      const cEndTime = toMinute(c.time_to); // Convert string to number
      if (
        c.day_w === course.day_w &&
        ((cStartTime >= courseStartTime && cStartTime < courseEndTime) ||
          (cEndTime > courseStartTime && cEndTime <= courseEndTime) ||
          (cStartTime <= courseStartTime && cEndTime >= courseEndTime))
      ) {
        conflicts.push(c);
      }
    }

    return conflicts;
  } catch (error) {
    return [];
  }
};

export default checkTimeConflict;
