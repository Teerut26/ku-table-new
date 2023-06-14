import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { create } from "zustand";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import RoomSeparate from "@/utils/roomSeparate";
import CourseDateSeparate from "@/utils/courseDateSeparate";
import dayjs from "dayjs";
import _ from "lodash";
import { v4 as uuid } from "uuid";

interface CartSubject {
  courses: Course[];
  addCourse: (subject: OpenSubjectForEnrollInterface) => void;
  removeCourse: (course: Course) => void;
  setCourse: (courses: Course[]) => void;
  clearCourse: () => void;
}

const useCartSubjectStore = create<CartSubject>((set) => ({
  courses: [],
  addCourse: (subject: OpenSubjectForEnrollInterface) => {
    const newCourse = CourseDateSeparate(subject.coursedate).map(
      (date, index) => {
        const rspEN = RoomSeparate(subject.roomNameEn);
        const rspTH = RoomSeparate(subject.roomNameTh);
        const timeStart = dayjs(date.time_from, "HH:mm").diff(
          dayjs("00:00", "HH:mm"),
          "minute"
        );
        return {
          uuid: uuid(),
          subject_code: subject.subjectCode,
          subject_name_en: subject.subjectNameEn,
          subject_name_th: subject.subjectNameTh,
          section_code: subject.sectionCode,
          room_name_en: rspEN.length > 1 ? rspEN[index]?.room : rspEN[0]?.room,
          room_name_th: rspTH.length > 1 ? rspTH[index]?.room : rspTH[0]?.room,
          section_type_en: subject.sectionTypeEn,
          section_type_th: subject.sectionTypeTh,
          teacher_name: subject.teacherName,
          teacher_name_en: subject.teacherNameEn,
          day_w: date.day_w,
          time_to: date.time_to,
          time_from: date.time_from,
          time_start: timeStart,
          max_credit: subject.maxCredit,
        } as Course;
      }
    );
    set((state) => {
      return {
        courses: [...state.courses, ...newCourse],
      };
    });
  },
  removeCourse: (course: Course) => {
    set((state) => {
      let appCourse = state.courses;
      _.remove(
        appCourse,
        (c) =>
          c.subject_code === course.subject_code &&
          c.max_credit === course.max_credit
      );
      return {
        courses: appCourse,
      };
    });
  },
  setCourse: (courses: Course[]) => {
    set(() => ({
      courses: courses,
    }));
  },
  clearCourse: () => {
    set(() => ({
      courses: [],
    }));
  },
}));

export default useCartSubjectStore;
