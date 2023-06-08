import { z } from "zod";

export interface GroupCourseResponseInterface {
  peroid_date: string;
  course: Course[];
}

export interface Course {
  uuid?: string;
  max_credit?: number;
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
  section_id: z.number().optional(),
  groupheader: z.string().optional(),
  weekstartday: z.string().optional(),
  weekendday: z.string().optional(),
  std_id: z.string().optional(),
  subject_code: z.string().optional(),
  subject_name_th: z.string().optional(),
  subject_name_en: z.string().optional(),
  section_code: z.string().optional(),
  section_type: z.string().optional(),
  section_type_th: z.string().optional(),
  section_type_en: z.string().optional(),
  student_status_code: z.string().optional(),
  std_status_th: z.string().optional(),
  std_status_en: z.string().optional(),
  teacher_name: z.string().optional(),
  teacher_name_en: z.string().optional(),
  day_w_c: z.string().optional(),
  time_from: z.string().optional(),
  time_to: z.string().optional(),
  day_w: z.string().optional(),
  room_name_th: z.string().optional(),
  room_name_en: z.string().optional(),
  time_start: z.number().optional(),
  uuid: z.string().optional(),
  max_credit: z.number().optional(),
});
