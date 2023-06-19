import { createTRPCRouter } from "./trpc";
import { groupCourseRouter } from "./routers/group_course";
import { shareRouter } from "./routers/share";
import { subjectRouter } from "./routers/subject";
import { sendReportRouter } from "./routers/send-report";
import { syncRouter } from "./routers/sync";

export const appRouter = createTRPCRouter({
  group_course: groupCourseRouter,
  share: shareRouter,
  subject: subjectRouter,
  sendReport: sendReportRouter,
  sync: syncRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
