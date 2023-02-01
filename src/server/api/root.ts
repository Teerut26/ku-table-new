import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { groupCourseRouter } from "./routers/group_course";
import { shareRouter } from "./routers/share";

export const appRouter = createTRPCRouter({
  //   example: exampleRouter,
  group_course: groupCourseRouter,
  share: shareRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
