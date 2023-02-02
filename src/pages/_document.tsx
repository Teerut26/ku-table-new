import { useTheme } from "next-themes";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>KU Table 2</title>
        <meta name="title" content="KU Table 2" />
        <meta
          name="description"
          content="ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://table.csku.in.th/" />
        <meta property="og:url" content="https://ku-table2.vercel.app" />
        <meta property="og:title" content="KU Table 2" />
        <meta
          property="og:description"
          content="ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!"
        />
        <meta
          property="og:image"
          content="https://ku-table2.vercel.app/main.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ku-table2.vercel.app" />
        <meta property="twitter:title" content="KU Table 2" />
        <meta
          property="twitter:description"
          content="ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!"
        />
        <meta
          property="twitter:image"
          content="https://ku-table2.vercel.app/main.png"
        />
        <link rel="icon" href="/logo.png" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
