import { DefaultSeoProps } from "next-seo";

export default {
  title: "KU Get Reg: จัดตารางเรียน",
  description: "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) จัดตารางเรียน",
  openGraph: {
    title: "KU Get Reg: จัดตารางเรียน",
    url: "https://kugetreg.onrender.com",
    type: "website",
    description: "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) จัดตารางเรียน",
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
      content: "ku,kaset,เกษตร,reg,getreg,regku,ตารางเรียน,ตารางสอน,gened,KU Get Reg,ลงทะเบียนเรียน,อำนวยความสะดวก",
    },
    {
      name: "google-site-verification",
      content: "GbVnz8dxZstenMRFhAbjs3OFMe-08dmT8OThyO9mI8I",
    },
    {
      name: "og:image:alt",
      content: "KU Get Reg",
    },
    {
      name: "application-name",
      content: "KU Get Reg",
    },
  ],
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
