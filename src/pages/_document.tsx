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
          content="https://ku-table2.vercel.app/og.png"
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
          content="https://ku-table2.vercel.app/og.png"
        />
        <link rel="icon" href="/logo.png" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3059506,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        <script async defer data-website-id="f17b31f5-307c-4fdd-9975-5f82fd31ae05" src="https://umami.csku.in.th/umami.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
