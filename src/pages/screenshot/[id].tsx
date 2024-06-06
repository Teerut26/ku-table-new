import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import clsx from "clsx";
import VerticalLine from "@/components/VerticalLine";
import _ from "lodash";
import TimeBar from "@/components/TimeBar";
import CourseBar from "@/components/CourseBar";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import CourseCardMobileList from "@/components/TableMobile/CourseCardMobileList";
import useTableStore from "@/components/Table/store/useTableStore";
import { redisClient } from "@/services/redis";

let times: string[] = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface Props {
  isIPhone: boolean;
  screenType: string;
  lang: string;
  theme: string;
  major: string;
  courseData: Course[];
  isExpand?: boolean;
}

export async function getServerSideProps(context: NextPageContext) {
  const result = await redisClient.get(context.query.id?.toString()!);

  const { screenType, lang, theme, major, courseData, isExpand } = JSON.parse(result as string);

  return {
    props: {
      screenType,
      lang,
      theme,
      major,
      isExpand,
      courseData: courseData ? JSON.parse(courseData as string) : [],
    },
  };
}

const Share: NextPage<Props> = ({ lang, courseData, screenType, major, theme, isExpand }) => {
  const { query, push, pathname, asPath } = useRouter();
  const { setTheme } = useTheme();
  const { setExpand } = useTableStore((r) => r);

  const CourseSorting = (courses: Course[] | undefined) => {
    const sortedItems = _.orderBy(courses, ["time_start"], "asc");
    return sortedItems;
  };

  const maxTime = _.maxBy(CourseSorting(courseData), (o) => {
    return parseInt(o.time_to?.split(":")[0]!);
  });

  const maxIndex = _.findIndex(times, (time) => time === maxTime?.time_to?.split(":")[0] + ":00") + 1;

  useEffect(() => {
    if (theme) {
      setTheme(theme as string);
    }
  }, [theme, setTheme]);

  useEffect(() => {
    push({ pathname, query }, asPath, { locale: lang });
  }, [lang]);

  useEffect(() => {
    setExpand(isExpand ?? false);
  }, [isExpand]);

  return (
    <>
      {screenType === "desktop" ? (
        <div id="capture" className={clsx("flex min-w-[75rem] flex-col bg-base-100 p-5")}>
          <div className={clsx("relative overflow-hidden border-b-[1px] border-l-[1px] border-r-[1px] border-base-content")}>
            <VerticalLine times={times.slice(0, maxIndex)} />
            <div className={clsx("relative z-10")}>
              <TimeBar times={times.slice(0, maxIndex)} />
              {days.map((day, index) => {
                return <CourseBar key={index} data={CourseSorting(courseData).filter((course) => course.day_w?.replaceAll(" ", "") === day)} times={times.slice(0, maxIndex)} day={day} />;
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 whitespace-nowrap text-base-content">
              <div>Generate by :</div>
              <div className="font-bold">kugetreg.teerut.com</div>
            </div>
          </div>
        </div>
      ) : (
        <CourseCardMobileList major={major} courseDatas={courseData} />
      )}
    </>
  );
};

export default Share;
