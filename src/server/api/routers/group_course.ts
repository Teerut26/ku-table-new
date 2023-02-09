import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import getGroupCourseService from "@/services/get-course";
import getSchedule from "@/services/get-schedule";

export const groupCourseRouter = createTRPCRouter({
  getCourse: protectedProcedure.query(async ({ input, ctx }) => {
    const {
      studentStatusCode: stdStatusCode,
      campusCode,
      facultyCode,
      majorCode,
    } = ctx.session.user.email?.user.student!;

    try {
      let resSchedule = await getSchedule({
        stdStatusCode,
        campusCode,
        facultyCode,
        majorCode,
        userType: "1",
        token: ctx.session.user.email?.accesstoken!,
      });

      let res = await getGroupCourseService({
        token: ctx.session.user.email?.accesstoken!,
        stdId: ctx.session.user.email?.user.student?.stdId!,
        academicYear: resSchedule.data.results[0]?.academicYr!,
        semester: resSchedule.data.results[0]?.semester!,
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.code);
    }
  }),
});
