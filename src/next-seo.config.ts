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
        "ku table, ตารางเรียน, มก, มหาวิทยาลัยเกษตรศาสตร์, บางเขน, กำแพงแสน, ศรีราชา, ทุกวิทยาเขต,ku table มก,ตารางเรียน มก,ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์,ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ บางเขน,ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ กำแพงแสน,ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ ศรีราชา,ตารางเรียน มหาวิทยาลัยเกษตรศาสตร์ ทุกวิทยาเขต, kaset table, kaset, kaset table bangkhen, kaset table kamphaengsaen, kaset table sri racha, kaset table all campus, kaset table มก, kaset table มหาวิทยาลัยเกษตรศาสตร์, kaset table มหาวิทยาลัยเกษตรศาสตร์ บางเขน, kaset table มหาวิทยาลัยเกษตรศาสตร์ กำแพงแสน, kaset table มหาวิทยาลัยเกษตรศาสตร์ ศรีราชา, kaset table มหาวิทยาลัยเกษตรศาสตร์ ทุกวิทยาเขต",
    },
  ],
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
