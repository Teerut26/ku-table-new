import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { TimeMap } from "@/interfaces/TimeMap";
import styled from "@emotion/styled";
import clsx from "clsx";
import { NextPage } from "next";

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

const CourseBar: NextPage<Props> = ({ times, day, data }) => {
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
      <BarChildren start={1} end={3}>
        {day}
      </BarChildren>
      {data?.map((course, index) => (
        <BarChildren
          start={getPosition(course.time_from)}
          end={getPosition(course.time_to)}
          className="flex flex-col p-2 cursor-pointer hover:bg-base-200"
        >
          <div className="flex justify-between">
            <Text>{course.subject_code}</Text>
            <Text>
              [{course.time_from} - {course.time_to}]
            </Text>
          </div>
          <Text>{course.subject_name_en}</Text>
          <Text>Room {course.room_name_en}</Text>
          <div className="flex gap-2">
            <div
              className={clsx(
                "badge badge-sm",
                course.section_type_en === "Lecture"
                  ? "badge-primary"
                  : "badge-secondary"
              )}
            >
              {course.section_type_en}
            </div>
            <div className="badge-accent badge badge-sm">
              {course.std_status_en}
            </div>
          </div>
        </BarChildren>
      ))}
    </Bar>
  );
};

export default CourseBar;
