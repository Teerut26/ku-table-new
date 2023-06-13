import { Course } from "@/interfaces/GroupCourseResponseInterface";
import _ from "lodash";

const courseFindUnique = (courses: Course[]) => {
  return _.uniqBy(courses, (x) => x.subject_code + x.max_credit);
};

export default courseFindUnique;
