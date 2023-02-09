import { z } from "zod"

export interface GroupCourseResponseInterface {
  peroid_date: string;
  course: Course[];
}

export interface Course {
  section_id: number;
  groupheader: string;
  weekstartday: string;
  weekendday: string;
  std_id: string;
  subject_code: string;
  subject_name_th: string;
  subject_name_en: string;
  section_code: string;
  section_type: string;
  section_type_th: string;
  section_type_en: string;
  student_status_code: string;
  std_status_th: string;
  std_status_en: string;
  teacher_name: string;
  teacher_name_en: string;
  day_w_c: string;
  time_from: string;
  time_to: string;
  day_w: string;
  room_name_th: string;
  room_name_en: string;
  time_start: number;
}

export const courseSchema = z.object({
    section_id: z.number(),
    groupheader: z.string(),
    weekstartday: z.string(),
    weekendday: z.string(),
    std_id: z.string(),
    subject_code: z.string(),
    subject_name_th: z.string(),
    subject_name_en: z.string(),
    section_code: z.string(),
    section_type: z.string(),
    section_type_th: z.string(),
    section_type_en: z.string(),
    student_status_code: z.string(),
    std_status_th: z.string(),
    std_status_en: z.string(),
    teacher_name: z.string(),
    teacher_name_en: z.string(),
    day_w_c: z.string(),
    time_from: z.string(),
    time_to: z.string(),
    day_w: z.string(),
    room_name_th: z.string(),
    room_name_en: z.string(),
    time_start: z.number()
  })
