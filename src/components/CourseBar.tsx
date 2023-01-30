import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { TimeMap } from "@/interfaces/TimeMap";
import LocaleSwip from "@/utils/localeSwip";
import styled from "@emotion/styled";
import clsx from "clsx";
import { NextPage } from "next";
import { useRouter } from "next/router";

let timeMap: TimeMap[] = [
  { time: "8:00", pos: 3 },
  { time: "8:30", pos: 4 },
  { time: "9:00", pos: 5 },
  { time: "9:30", pos: 6 },
  { time: "10:00", pos: 7 },
  { time: "10:30", pos: 8 },
  { time: "11:00", pos: 9 },
  { time: "11:30", pos: 10 },
  { time: "12:00", pos: 11 },
  { time: "12:30", pos: 12 },
  { time: "13:00", pos: 13 },
  { time: "13:30", pos: 14 },
  { time: "14:00", pos: 15 },
  { time: "14:30", pos: 16 },
  { time: "15:00", pos: 17 },
  { time: "15:30", pos: 18 },
  { time: "16:00", pos: 19 },
  { time: "16:30", pos: 20 },
  { time: "17:00", pos: 21 },
  { time: "17:30", pos: 22 },
  { time: "18:00", pos: 23 },
  { time: "18:30", pos: 24 },
  { time: "19:00", pos: 25 },
  { time: "19:30", pos: 26 },
  { time: "20:00", pos: 27 },
  { time: "20:30", pos: 28 },
  { time: "21:00", pos: 29 },
  { time: "21:30", pos: 30 },
  { time: "22:00", pos: 31 },
  { time: "22:30", pos: 32 },
  { time: "23:00", pos: 33 },
  { time: "23:30", pos: 34 },
];

interface Props {
  times: string[];
  day: string;
  data: Course[] | undefined;
}

interface getCourseDataInterface {
  start: number;
  end: number;
}

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GoldrenBadge = styled.div`
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    );
`;

const CourseBar: NextPage<Props> = ({ times, day, data }) => {
  const { locale } = useRouter();
  const Bar = styled.div`
    display: grid;
    grid-template-columns: repeat(${times.length * 2 + 2}, minmax(0, 1fr));
  `;

  const BarChildren = styled.div<getCourseDataInterface>`
    grid-column: ${(props) => props.start} / ${(props) => props.end};
    border: 0.5px solid;
    min-height: 7rem;
  `;

  const getPosition = (time: string) => {
    const timeObj = timeMap.find((t) => t.time === time);
    if (timeObj) {
      return timeObj.pos;
    }
    return 0;
  };

  return (
    <Bar>
      <BarChildren
        className="flex items-center justify-center text-xl"
        start={1}
        end={3}
      >
        {day}
      </BarChildren>
      {data?.map((course, index) => (
        <BarChildren
          key={index}
          start={getPosition(course.time_from)}
          end={getPosition(course.time_to)}
          className="flex cursor-pointer flex-col p-2 hover:bg-base-200"
        >
          <div className="flex justify-between">
            <Text>{course.subject_code}</Text>
            <Text>
              [{course.time_from} - {course.time_to}]
            </Text>
          </div>
          <Text>
            {LocaleSwip(
              locale!,
              course.subject_name_th,
              course.subject_name_en
            )}
          </Text>
          <Text>Room {course.room_name_en}</Text>
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "badge badge-sm",
                course.section_type_en === "Lecture" ||
                  course.section_type_th === "บรรยาย"
                  ? "badge-primary"
                  : "badge-secondary"
              )}
            >
              {LocaleSwip(
                locale!,
                course.section_type_th,
                course.section_type_en
              )}
            </div>
            <>
              {course.std_status_en === "Special" ||
              course.section_type_th === "พิเศษ" ? (
                <>
                  <GoldrenBadge className="badge badge-sm border-0 text-white">
                    {LocaleSwip(
                      locale!,
                      course.std_status_th,
                      course.std_status_en
                    )}
                  </GoldrenBadge>
                </>
              ) : (
                <>
                  <div className="badge badge-accent badge-sm">
                    {LocaleSwip(
                      locale!,
                      course.std_status_th,
                      course.std_status_en
                    )}
                  </div>
                </>
              )}
            </>
          </div>
        </BarChildren>
      ))}
    </Bar>
  );
};

export default CourseBar;
