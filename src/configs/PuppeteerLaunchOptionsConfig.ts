import { type PuppeteerLaunchOptions } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const PuppeteerLaunchOptionsConfig: PuppeteerLaunchOptions = {
  args: process.env.IS_LOCAL ? ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] : chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: process.env.IS_LOCAL
    ? process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : process.platform === "linux"
        ? "/usr/bin/chromium-browser"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : await chromium.executablePath(),
  headless: chromium.headless,
};
