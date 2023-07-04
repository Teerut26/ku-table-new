import { DefaultSeoProps } from "next-seo";

export default {
  title: "KU Get Reg",
  description:
    "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) จัดตารางเรียน",
  openGraph: {
    title: "KU Get Reg",
    url: "https://kugetreg.vercel.app",
    type: "website",
    description:
      "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) จัดตารางเรียน",
    images: [
      {
        url: "/og.png",
        width: 1600,
        height: 900,
        alt: "KU Get Reg",
      },
    ],
    siteName: "KU Get Reg",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "ku,kaset,เกษตร,reg,getreg,regku,ตารางเรียน,ตารางสอน,gened,KU Get Reg,ลงทะเบียนเรียน,อำนวยความสะดวก"
    },
  ],
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
