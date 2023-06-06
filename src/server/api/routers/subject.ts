import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import getSchedule from "@/services/get-schedule";
import getSubject from "@/services/get-subject";
import getSubjects from "@/services/get-subjects";
import getSubjectSearchService from "@/services/subject-search";

export const subjectRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        section: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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

        let res = await getSubject({
          token: ctx.session.user.email?.accesstoken!,
          academicYear: resSchedule.data.results[0]?.academicYr!,
          campusCode: campusCode,
          semester: resSchedule.data.results[0]?.semester!,
          query: input.query,
          section: input.section,
        });
        return res.data;
      } catch (error: any) {
        throw new Error(error.response.data.code);
      }
    }),
  gets: protectedProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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

        let res = await getSubjects({
          token: ctx.session.user.email?.accesstoken!,
          academicYear: resSchedule.data.results[0]?.academicYr!,
          campusCode: campusCode,
          semester: resSchedule.data.results[0]?.semester!,
          query: input.query,
        });
        return res.data;
      } catch (error: any) {
        throw new Error(error.response.data.code);
      }
    }),
  search: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      try {
        let res = await getSubjectSearchService({
          token: ctx.session.user.email?.accesstoken!,
          query: input,
        });
        return res.data;
      } catch (error: any) {
        throw new Error(error.response.data.code);
      }
    }),
});
