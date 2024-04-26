// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_STORE_PASSWORD_KEY: `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7crrgwl5vBtlRTnSMxcN\n2aPcZ2XMAobM2/tPDM+Bjw0m3WYjkEmol/88ncpgHw6eSf31MRU5Nb/b9TFNN0zT\nb25B0jC89NVN9LMfo3ks4B1o+Mamtm2XPO399DVtD5Bs4gj7dNfpbO4W/WprtFOp\nhhlU5v+kT7aA1czEC7gKzKQnYKd44DnncGULdED/Asnd4jLOTGDY/v1Qv8vbK4HQ\nySiq3t7OrTunOkAwOUAgA7RGKUeGxbW5MJwRZDejHopbudSLtenfeld0ETgW1x3y\nXyyRW2l2l7/2bYF1UuPhf5yC147dYHA9W/Omjl/nyQnR1ozcGHTRV8bRIyB0Ct6k\nvQIDAQAB\n-----END PUBLIC KEY-----`
  },
  i18n: {
    locales: ["en","th"],
    defaultLocale: "en",
  },
};
export default config;
