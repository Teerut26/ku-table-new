import { z } from "zod";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const downloadRouter = createTRPCRouter({
  imageGenerate: publicProcedure.mutation(async ({ ctx }) => {
    console.log(process.env.NODE_ENV);
    
    const browser = await puppeteer.launch(
      process.env.NODE_ENV === "production"
        ? {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
          }
        : {
            args: [],
            executablePath:
              process.platform === "win32"
                ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
                : process.platform === "linux"
                ? "/usr/bin/google-chrome"
                : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000/share/DENm7HI", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(
      "#capture"
    );
    const logo = await page.$(
      "#capture"
    );

    const session = await page?.target().createCDPSession();
    await session.send("Emulation.setPageScaleFactor", {
      pageScaleFactor: 4, // 400%
    });

    // console.log();
    const result = await logo?.screenshot({ type: "png" })

    await browser.close();

    return "data:image/png;base64,"+result?.toString("base64");
  }),
});
