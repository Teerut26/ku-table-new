import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import _ from "lodash";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ChangeLanguage from "./ChangeLanguage";
import ShareTableBtn from "./ShareTableBtn";
import TimeBar from "./TimeBar";
import CourseBar from "./CourseBar";

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

interface Props {
  courseData: Course[];
  hasShare?: boolean;
}

const Table: NextPage<Props> = ({ courseData, hasShare }) => {
  const [isCapture, setIsCapture] = useState(false);
  const { locale } = useRouter();
  const [scale, setScale] = useLocalStorage<number>("scale", 1);
  const area = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { theme: themeCurrent } = useTheme();

  const maxTime = _.maxBy(courseData, (o) =>
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
    <>
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
          <select
            defaultValue={scale}
            onChange={(e) => setScale(e.target.value as any)}
            className="select-error select select-sm  text-error"
          >
            {[...new Array(7)].map((_, index) => (
              <option key={index} value={index + 1} className="text-center ">
                x{index + 1}
              </option>
            ))}
          </select>
          <ChangeLanguage />
          {hasShare && <ShareTableBtn courseData={courseData} />}
          
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
                data={courseData.filter(
                  (course) => course.day_w.replaceAll(" ", "") === day
                )}
                times={times.slice(0, maxIndex)}
                day={day}
              />
            ))}
          </div>
          {isCapture && (
            <div className="flex gap-2 text-base-content whitespace-nowrap">
              <div>Generate by :</div>
              <div className="font-bold">ku-table2.vercel.app</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
