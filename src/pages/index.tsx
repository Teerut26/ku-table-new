import CourseBar from "@/components/CourseBar";
import { api } from "../utils/api";
import TimeBar from "@/components/TimeBar";
import WithCheckSession from "@/layouts/WithCheckSession";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Kanit } from "@next/font/google";
import _ from "lodash";
import ThemeSwich from "@/components/ThemeSwich";
import clsx from "clsx";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import { useRef } from "react";
import { useTheme } from "next-themes";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useRouter } from "next/router";
import LocaleSwip from "@/utils/localeSwip";

let times: string[] = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const kanit = Kanit({
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
});

const Home: NextPage = () => {
  const { data: session } = useSession();
  const area = useRef<HTMLDivElement>(null);
  const { theme: themeCurrent } = useTheme();

  const { locale } = useRouter();

  const getCourseData = api.group_course.getCourse.useQuery({
    stdId: session?.user?.email?.user.student.stdId!,
  });

  const maxTime = _.maxBy(getCourseData.data?.results[0]?.course, (o) =>
    parseInt(o.time_to.split(":")[0]!)
  );

  const maxIndex =
    _.findIndex(
      times,
      (time) => time === maxTime?.time_to.split(":")[0] + ":00"
    ) + 1;

  const handleDownload = async () => {
    const scale = 5;
    setTimeout(async () => {
      const dataUrl = await domtoimage.toPng(area.current as any, {
        width: area.current?.clientWidth! * scale,
        height: area.current?.clientHeight! * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      });
      saveAs(
        dataUrl,
        `kutable-${session?.user?.email?.user.student.stdId}-${themeCurrent}.png`
      );
    }, 1000);
  };

  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-5xl flex-col justify-center  p-5 md:p-10">
        {getCourseData.status !== "loading" ? (
          <>
            {getCourseData.status === "success" ? (
              <>
                <div className="flex items-center justify-between">
                  <div className={clsx("text-2xl", kanit.className)}>
                    {LocaleSwip(locale!, "ตารางเรียน", "Schedule")}
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeSwich />
                    <div
                      onClick={() => signOut()}
                      className="btn-error btn-xs btn"
                    >
                      {LocaleSwip(locale!, "ออกจากระบบ", "Sign Out")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end md:justify-start">
                  <div
                    onClick={() => handleDownload()}
                    className="btn-error btn-sm btn gap-2 "
                  >
                    <CloudDownloadIcon sx={{ width: 20 }} /> PNG
                  </div>
                </div>
                <div className="mt-3 overflow-x-auto border">
                  <div
                    ref={area}
                    className="flex min-w-[130rem] flex-col bg-base-100"
                  >
                    <TimeBar times={times.slice(0, maxIndex)} />
                    {days.map((day, index) => (
                      <CourseBar
                        key={index}
                        data={getCourseData.data?.results[0]?.course.filter(
                          (course) => course.day_w.replaceAll(" ", "") === day
                        )}
                        times={times.slice(0, maxIndex)}
                        day={day}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>Error</div>
            )}
          </>
        ) : (
          "loading..."
        )}
      </div>
    </WithCheckSession>
  );
};

export default Home;
