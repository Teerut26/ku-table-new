import { DefaultSeoProps } from "next-seo";

export default {
  title: "KU Table",
  description:
    "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!",
  openGraph: {
    title: "KU Table",
    url: "https://ku-table2.vercel.app",
    type: "website",
    description:
      "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) สามารถบันทึกรูปตารางเรียนได้ เพียงล็อกอินด้วยบัญชีนนทรีเท่านั้น!",
    images: [
      {
        url: "/og.png",
        width: 1600,
        height: 900,
        alt: "KU Table",
      },
    ],
    siteName: "KU Table",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "ku table, ku table vercel, my ku table, ku table ตารางเรียน, ku table vercel, ku.table, ku-table, ตารางเรียน มก, ตารางเรียน ku, ตารางเรียน, ตารางเรียน มก ศรช, ตารางเรียน มก กพส, ตารางเรียน มก ฉกส"
    },
  ],
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
