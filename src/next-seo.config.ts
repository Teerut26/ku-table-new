import { DefaultSeoProps } from "next-seo";

export default {
  title: "KU Table 2",
  description:
    "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!",
  openGraph: {
    title: "KU Table 2",
    url: "https://ku-table2.vercel.app",
    type: "website",
    description:
      "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!",
    images: [
      {
        url: "/og.png",
        width: 1600,
        height: 900,
        alt: "KU Table 2",
      },
    ],
    siteName: "KU Table 2",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
