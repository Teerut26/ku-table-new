import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { groupCourseRouter } from "./routers/group_course";

export const appRouter = createTRPCRouter({
//   example: exampleRouter,
  group_course: groupCourseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
