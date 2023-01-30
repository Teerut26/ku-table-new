import CourseBar from "@/components/CourseBar";
import { api } from "../utils/api";
import TimeBar from "@/components/TimeBar";
import WithCheckSession from "@/layouts/WithCheckSession";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import _ from "lodash";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Navbar from "@/components/Navbar";
import ChangeLanguage from "@/components/ChangeLanguage";
import clsx from "clsx";
import Footer from "@/components/Footer";
import LocaleSwip from "@/utils/localeSwip";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";

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
  "22:00",
  "23:00",
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const Home: NextPage = () => {
  const { data: session } = useSession();
  const area = useRef<HTMLDivElement>(null);
  const { theme: themeCurrent } = useTheme();
  const [isCapture, setIsCapture] = useState(false);
  const [scale, setScale] = useLocalStorage<number>("scale", 1)
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
    setIsCapture(true);
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
      setIsCapture(false);
    }, 1000);
  };

  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
        {getCourseData.status !== "loading" ? (
          <>
            {getCourseData.status === "success" ? (
              <>
                <Navbar />
                <div className="flex items-center gap-2">
                  <div className="flex w-full items-center gap-2">
                    <div
                      onClick={() => handleDownload()}
                      className={clsx(
                        "btn-outline btn-error btn-sm btn gap-2 uppercase",
                        isCapture && "loading"
                      )}
                    >
                      {!isCapture && <CloudDownloadIcon sx={{ width: 20 }} />}
                      PNG
                    </div>
                    <ChangeLanguage />
                  </div>

                  <div className="w-full md:max-w-[13rem]">
                    <select defaultValue={scale} onChange={(e)=>setScale(e.target.value as any)} className="select-error select select-sm w-full text-error">
                      {[...new Array(7)].map((_, index) => (
                        <option key={index} value={index+1} className="text-center ">x{index+1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className={clsx(
                    "mt-3 overflow-x-auto",
                    "border-[1px] border-base-content"
                  )}
                >
                  <div
                    ref={area}
                    className={clsx(
                      "flex min-w-[130rem] flex-col bg-base-100",
                      isCapture && "p-8"
                    )}
                  >
                    <div
                      className={clsx(
                        isCapture &&
                          "border-b-[1px] border-l-[1px] border-r-[1px] border-base-content"
                      )}
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
                    {isCapture && (
                      <div className="flex gap-2 text-base-content">
                        <div>Generate by :</div>
                        <div className="font-bold">ku-table2.vercel.app</div>
                      </div>
                    )}
                  </div>
                </div>
                <Footer />
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
