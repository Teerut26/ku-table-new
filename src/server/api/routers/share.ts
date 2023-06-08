import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  Course,
  courseSchema,
} from "@/interfaces/GroupCourseResponseInterface";
import db from "@/configs/firestoreAdmin";
import generateString from "@/utils/generateString";
import CryptoJS from "crypto-js";

export const shareRouter = createTRPCRouter({
  saveShare: protectedProcedure
    .input(z.object({ courseData: z.array(courseSchema) }))
    .mutation(async ({ input, ctx }) => {
      try {
        const hascode = CryptoJS.SHA256(
          JSON.stringify(
            input.courseData.map((course) => ({ ...course, uuid: undefined }))
          )
        ).toString(CryptoJS.enc.Hex);

        const checkExsit = await db
          .collection("links")
          .where("hascode", "==", hascode)
          .get();

        if (checkExsit.docs.length > 0) {
          return checkExsit.docs.map((doc) => doc.data().link)[0];
        }

        let link = generateString();

        const linksRef = db.collection("links").doc(link);
        linksRef.set({
          link: link,
          hascode: hascode,
          courseData: input.courseData,
        });

        return link;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
  getTable: publicProcedure
    .input(z.object({ link: z.string() }))
    .query(async ({ input, ctx }) => {
      const linksRef = db.collection("links").doc(input.link);

      const data = await linksRef.get();

      return data.data()?.courseData as Course[];
    }),
});
