import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import getGroupCourseService from "@/services/get-course";

export const groupCourseRouter = createTRPCRouter({
  getCourse: protectedProcedure
    .input(z.object({ stdId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        let res = await getGroupCourseService({
          token: ctx.session.user.email?.accesstoken!,
          stdId: input.stdId,
          academicYear: "2565",
          semester: "2",
        });
        return res.data;
      } catch (error: any) {
        throw new Error(error.response.data.code);
      }

      
    }),
});
