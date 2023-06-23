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
      content: "ku table",
    },
    {
      name: "keywords",
      content: "ku table มก",
    },
    {
      name: "keywords",
      content: "ตารางเรียน มก",
    },
    {
      name: "keywords",
      content: "ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์",
    },
    {
      name: "keywords",
      content: "ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ บางเขน",
    },
    {
      name: "keywords",
      content: "ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ กำแพงแสน",
    },
    {
      name: "keywords",
      content: "ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ ศรีราชา",
    },
    {
      name: "keywords",
      content: "ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ ทุกวิทยาเขต",
    },
  ],
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
