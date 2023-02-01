import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  Course,
  courseSchema,
} from "@/interfaces/GroupCourseResponseInterface";
import db from "@/configs/firestoreAdmin";
import generateString from "@/utils/generateString";
import {} from "firebase-admin/firestore";

export const shareRouter = createTRPCRouter({
  saveShare: protectedProcedure
    .input(z.object({ courseData: z.array(courseSchema) }))
    .mutation(async ({ input, ctx }) => {
      const checkExsit = await db
        .collection("links")
        .where("stdId", "==", ctx.session.user.email?.user.student.stdId)
        .get();

      if (checkExsit.docs.length > 0) {
        return checkExsit.docs.map((doc) => doc.data().link)[0];
      }

      let link = generateString();

      const linksRef = db.collection("links").doc(link);
      linksRef.set({
        link: link,
        stdId: ctx.session.user.email?.user.student.stdId,
        courseData: input.courseData,
      });

      return link;
    }),
  getTable: publicProcedure
    .input(z.object({ link: z.string() }))
    .query(async ({ input, ctx }) => {
      const linksRef = db.collection("links").doc(input.link);

      const data = await linksRef.get();

      return data.data()?.courseData as Course[];
    }),
});
