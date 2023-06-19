import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  Course,
  courseSchema,
} from "@/interfaces/GroupCourseResponseInterface";
import { getSyncCourse, syncCourse } from "@/services/syncCourse";

export const syncRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const reulst = await getSyncCourse(ctx.session.user.email?.user.idCode!);
    return reulst;
  }),

  sync: protectedProcedure
    .input(z.object({ courseData: z.array(courseSchema) }))
    .mutation(async ({ input, ctx }) => {
      ctx.session.user.email?.user.idCode;
      await syncCourse({
        course: input.courseData as Course[],
        stdId: ctx.session.user.email?.user.idCode!,
      });
    }),
});
