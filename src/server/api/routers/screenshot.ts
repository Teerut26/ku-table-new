import { courseSchema } from "@/interfaces/GroupCourseResponseInterface";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import puppeteer from "puppeteer";

export const screenshotRouter = createTRPCRouter({
  capture: protectedProcedure
    .input(
      z.object({
        theme: z.string(),
        screenType: z.enum(["desktop", "mobile"]),
        courseData: z.array(courseSchema),
        lang: z.string(),
        major: z.string(),
        scale: z.number().optional(),
        isExpand: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : process.platform === "linux" ? "/usr/bin/google-chrome" : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args: ["--no-sandbox", "--headless", "--disable-gpu", "--disable-dev-shm-usage"],
      });
      const page = await browser.newPage();
      const width = input.isExpand ? 1000 : 600;
      await page.setViewport({ width: width, height: 0, deviceScaleFactor: input.scale ?? 3 });

      const url = new URL(`${process.env.NEXTAUTH_URL}/screenshot/capture`);
      url.searchParams.append("theme", input.theme);
      url.searchParams.append("screenType", input.screenType);
      url.searchParams.append("courseData", JSON.stringify(input.courseData));
      url.searchParams.append("lang", input.lang);
      url.searchParams.append("major", input.major);
      url.searchParams.append("isExpand", input.isExpand ? "true" : "false");

      await page.goto(url.toString(), {
        waitUntil: "networkidle2",
      });

      await page.waitForSelector("#capture");
      const logo = await page.$("#capture");
      const result = await logo?.screenshot({ type: "png" });

      await browser.close();

      return "data:image/png;base64," + result?.toString("base64");
    }),
  pdf: protectedProcedure
    .input(
      z.object({
        theme: z.string(),
        screenType: z.enum(["desktop", "mobile"]),
        courseData: z.array(courseSchema),
        lang: z.string(),
        major: z.string(),
        scale: z.number().optional(),
        isExpand: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : process.platform === "linux" ? "/usr/bin/google-chrome" : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args: ["--no-sandbox", "--headless", "--disable-gpu", "--disable-dev-shm-usage"],
      });
      const page = await browser.newPage();
      const width = input.isExpand ? 1000 : 600;
      await page.setViewport({ width: width, height: 0, deviceScaleFactor: input.scale ?? 3 });

      const url = new URL(`${process.env.NEXTAUTH_URL}/screenshot/capture`);
      url.searchParams.append("theme", input.theme);
      url.searchParams.append("screenType", input.screenType);
      url.searchParams.append("courseData", JSON.stringify(input.courseData));
      url.searchParams.append("lang", input.lang);
      url.searchParams.append("major", input.major);
      url.searchParams.append("isExpand", input.isExpand ? "true" : "false");

      await page.goto(url.toString(), {
        waitUntil: "networkidle2",
      });

      await page.waitForSelector("#capture");

      const pdf = await page.pdf({ format: 'A4', printBackground: true, landscape: input.screenType === "desktop" });

      await browser.close();

      return "data:application/pdf;base64," + pdf.toString("base64");
    }),
});
