import { courseSchema } from "@/interfaces/GroupCourseResponseInterface";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import puppeteer, { PDFOptions } from "puppeteer";
import db from "@/configs/firestoreAdmin";
import { redisClient } from "@/services/redis";
import { v4 as uuid } from "uuid";

const screenshotSchema = z.object({
  theme: z.string(),
  screenType: z.enum(["desktop", "mobile"]),
  courseData: z.string(),
  lang: z.string(),
  major: z.string(),
  scale: z.number().optional(),
  isExpand: z.boolean().optional(),
});

export const screenshotRouter = createTRPCRouter({
  capture: protectedProcedure.input(screenshotSchema).mutation(async ({ input }) => {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : process.platform === "linux" ? "/usr/bin/chromium-browser" : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--headless", "--disable-gpu", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();
    let width = 700;
    if (input.isExpand) {
      width = 1000;
      if (input.screenType === "desktop") {
        width = 1700;
      }
    }
    await page.setViewport({ width: width, height: 0, deviceScaleFactor: input.scale ?? 3 });

    const keyId = uuid();
    await redisClient.set(keyId, JSON.stringify(input), {
      EX: 60, // 1 minute
    });

    const url = new URL(`${process.env.NEXTAUTH_URL}/screenshot/${keyId}`);
    await page.goto(url.toString());

    await page.waitForSelector("#capture");
    const logo = await page.$("#capture");
    const result = await logo?.screenshot({ type: "png" });
    await page.close();
    await redisClient.del(keyId);
    await browser.close();

    return "data:image/png;base64," + result?.toString("base64");
  }),
  pdf: protectedProcedure.input(screenshotSchema).mutation(async ({ input }) => {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : process.platform === "linux" ? "/usr/bin/chromium-browser" : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--headless", "--disable-gpu", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();

    let width = 600;
    if (input.isExpand) {
      width = 1000;
      if (input.screenType === "desktop") {
        width = 1700;
      }
    }

    await page.setViewport({ width: width, height: 0 });

    const keyId = uuid();
    await redisClient.set(keyId, JSON.stringify(input), {
      EX: 60, // 1 minute
    });

    const url = new URL(`${process.env.NEXTAUTH_URL}/screenshot/${keyId}`);
    await page.goto(url.toString());

    await page.waitForSelector("#capture");

    let scale = 0.8;
    if (input.isExpand) {
      scale = 0.8;
      if (input.screenType === "desktop") {
        scale = 0.7;
      }
    }

    const pdfOption: PDFOptions = {
      printBackground: true,
      landscape: input.screenType === "desktop",
      scale: scale,
      format: "A4",
    };

    const pdf = await page.pdf(pdfOption);
    await page.close();
    await redisClient.del(keyId);
    await browser.close();
    return "data:application/pdf;base64," + pdf.toString("base64");
  }),
  receipt: protectedProcedure.input(screenshotSchema).mutation(async ({ input }) => {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : process.platform === "linux" ? "/usr/bin/chromium-browser" : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--headless", "--disable-gpu", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();

    let width = 600;

    await page.setViewport({ width: width, height: 0, deviceScaleFactor: input.scale ?? 3 });

    const keyId = uuid();
    await redisClient.set(keyId, JSON.stringify(input), {
      EX: 60, // 1 minute
    });

    const url = new URL(`${process.env.NEXTAUTH_URL}/en/receipt/${keyId}`);
    await page.goto(url.toString(), {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("#capture");
    const logo = await page.$("#capture");
    const result = await logo?.screenshot({ type: "png" });
    await page.close();
    await redisClient.del(keyId);
    await browser.close();

    return "data:image/png;base64," + result?.toString("base64");
  }),
});
