import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { TimeMap } from "@/interfaces/TimeMap";
import styled from "@emotion/styled";
import { NextPage } from "next";
import BarChildren from "./BarChildren";

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
  canRemove?: boolean;
  onRemove?: (course: Course) => void;
  canEdit?: boolean;
  onEdit?: (course: Course) => void;
}

const CourseBar: NextPage<Props> = ({
  times,
  day,
  data,
  canRemove,
  onRemove,
  canEdit,
  onEdit,
}) => {
  const Bar = styled.div`
    display: grid;
    grid-template-columns: repeat(${times.length * 2 + 2}, minmax(0, 1fr));
  `;

  const DayBar = styled.label<{ start: number; end: number }>`
    grid-column: ${(props) => props.start} / ${(props) => props.end};
    border: 0.5px solid;
    min-height: 7rem;
  `;

  const getPosition = (time: string) => {
    const hour = parseInt(time.split(":")[0]!);
    const minute = parseInt(time.split(":")[1]!);
    const timeString = `${hour}:${minute === 0 ? "00" : "30"}`;
    const timeObj = timeMap.find((t) => t.time === timeString);
    if (timeObj) {
      return timeObj.pos;
    }
    return 0;
  };

  return (
    <Bar className="divide">
      <DayBar
        className="flex items-center justify-center text-xl row-span-6"
        start={1}
        end={3}
      >
        {day}
      </DayBar>
      {data?.map((course, index) => {
        return (
          <BarChildren
            key={index}
            course={course}
            start={getPosition(course.time_from!)}
            end={getPosition(course.time_to!)}
            canRemove={canRemove}
            onRemove={onRemove}
            canEdit={canEdit}
            onEdit={onEdit}
          />
        );
      })}
    </Bar>
  );
};

export default CourseBar;
