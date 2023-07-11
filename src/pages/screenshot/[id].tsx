import LoadingAnimation from "@/components/LoadingAnimation";
import { api } from "@/utils/api";
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
  isIPhone: boolean;
}

export async function getServerSideProps(context: NextPageContext) {
  const UA = context.req!.headers["user-agent"];
  let isIPhone = false;
  if (UA!.match(/iPhone|iPad|Macintosh/i)) {
    if (UA!.match(/Mobile/i)) {
      isIPhone = true;
    } else if (UA!.match(/Chrome/i)) {
      isIPhone = false;
    } else {
      isIPhone = true;
    }
  }
  return {
    props: { isIPhone },
  };
}

const Share: NextPage<Props> = ({ isIPhone }) => {
  const { query, back } = useRouter();
  const { setTheme } = useTheme();

  const CourseSorting = (courses: Course[] | undefined) => {
    const sortedItems = _.orderBy(courses, ["time_start"], "asc");
    return sortedItems;
  };

  const couresData = api.share.getTable.useQuery({ link: query.id as string });

  const maxTime = _.maxBy(CourseSorting(couresData.data), (o) => {
    return parseInt(o.time_to?.split(":")[0]!);
  });

  const maxIndex =
    _.findIndex(
      times,
      (time) => time === maxTime?.time_to?.split(":")[0] + ":00"
    ) + 1;

  console.log(query);

  useEffect(() => {
    if (query.theme) {
      setTheme(query.theme as string);
    }
  }, [query]);

  return (
    <>
      {couresData.status !== "loading" ? (
        <>
          {couresData.status === "success" && (
            <div
              className={clsx("flex min-w-[75rem] flex-col bg-base-100 p-5")}
            >
              <div
                className={clsx(
                  "relative overflow-hidden border-b-[1px] border-l-[1px] border-r-[1px] border-base-content"
                )}
              >
                <VerticalLine times={times.slice(0, maxIndex)} />
                <div className={clsx("relative z-10")}>
                  <TimeBar times={times.slice(0, maxIndex)} />
                  {days.map((day, index) => {
                    return (
                      <CourseBar
                        key={index}
                        data={CourseSorting(couresData.data).filter(
                          (course) => course.day_w?.replaceAll(" ", "") === day
                        )}
                        times={times.slice(0, maxIndex)}
                        day={day}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 whitespace-nowrap text-base-content">
                  <div>Generate by :</div>
                  <div className="font-bold">kugetreg.vercel.app</div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

export default Share;
