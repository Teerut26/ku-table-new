import { createTRPCRouter } from "./trpc";
import { groupCourseRouter } from "./routers/group_course";
import { shareRouter } from "./routers/share";
import { subjectRouter } from "./routers/subject";

export const appRouter = createTRPCRouter({
  //   example: exampleRouter,
  group_course: groupCourseRouter,
  share: shareRouter,
  subject: subjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
