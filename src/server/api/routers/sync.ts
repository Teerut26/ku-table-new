import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Course, courseSchema } from "@/interfaces/GroupCourseResponseInterface";
import { getSyncCourse, syncCourse } from "@/services/syncCourse";
import { redisClient } from "@/services/redis";

export const syncRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const result = await getSyncCourse(ctx.session.user.email?.user.idCode!);
    return result;
  }),

  sync: protectedProcedure.input(z.object({ courseData: z.array(courseSchema) })).mutation(async ({ input, ctx }) => {
    await syncCourse({
      course: input.courseData as Course[],
      stdId: ctx.session.user.email?.user.idCode!,
    });
  }),
});
