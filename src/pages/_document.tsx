import { useTheme } from "next-themes";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://umami-teerut.vercel.app/script.js" data-website-id="a12aa127-192f-47aa-8a6d-e6cdf9a48ffc"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
