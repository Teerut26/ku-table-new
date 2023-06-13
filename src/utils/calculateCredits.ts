import { Course } from "@/interfaces/GroupCourseResponseInterface";
import _ from "lodash";
const calculateCredits = (courses: Course[]) => {
  return _.sumBy(
    _.uniqBy(courses, (x) => x.subject_code + x.max_credit),
    (x) => x.max_credit!
  );
};

export default calculateCredits;
