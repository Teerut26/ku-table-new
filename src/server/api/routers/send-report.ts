import sendReport from "@/services/send-report";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const sendReportRouter = createTRPCRouter({
  send: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await sendReport({ message: input.message });
        return "ok";
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
});
