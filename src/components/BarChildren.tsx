import { Course } from "@/interfaces/GroupCourseResponseInterface";
import LocaleSwip from "@/utils/localeSwip";
import styled from "@emotion/styled";
import clsx from "clsx";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Button, Tag } from "antd";
import TeacherSeparate from "@/utils/teacherSeparate";
import { Icon } from "@iconify/react";
import { colorsMap, convertKeyToColor } from "@/utils/colorsMap";
import useTableStore from "./Table/store/useTableStore";
import EditCourse from "./Index/EditCourse";
import toast from "react-hot-toast";

interface Props {
  start: number;
  end: number;
  course: Course;
  canRemove?: boolean;
  onRemove?: (course: Course) => void;
  canEdit?: boolean;
  onEdit?: (course: Course) => void;
}

interface getCourseDataInterface {
  start: number;
  end: number;
  day?: string;
}

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GoldrenBadge = styled.div`
  background: radial-gradient(ellipse farthest-corner at right bottom, #fedb37 0%, #fdb931 8%, #9f7928 30%, #8a6e2f 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #ffffff 0%, #ffffac 8%, #d1b464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
`;

const BarChildren: NextPage<Props> = ({ start, end, course, canRemove, onRemove, canEdit, onEdit }) => {
  const { locale } = useRouter();
  const area = useRef<HTMLLabelElement>(null);
  const { expand, imageBackground, opacityTable } = useTableStore((r) => r);

  const StyleCss = styled.label<getCourseDataInterface>`
    grid-column: ${(props) => props.start} / ${(props) => props.end};
    border-left: 5px solid ${({ day }) => (day ? convertKeyToColor(day)?.textHex : "gray")};
    border-right: 0.5px solid;
    min-height: ${expand ? "7rem" : "5rem"};
    border-right-color: hsl(var(--bc) / 0.3);
    background-color: hsl(var(--b2, var(--b1)) / ${imageBackground ? opacityTable : "1"});
  `;

  const dayColorMap = [
    {
      day: "MON",
      color: "yellow",
    },
    {
      day: "TUE",
      color: "pink",
    },
    {
      day: "WED",
      color: "green",
    },
    {
      day: "THU",
      color: "orange",
    },
    {
      day: "FRI",
      color: "blue",
    },
    {
      day: "SAT",
      color: "purple",
    },
    {
      day: "SUN",
      color: "red",
    },
  ];

  const colorCreditMap = ["default", "orange", "green", "blue", "purple", "red"];

  return (
    <>
      <StyleCss day={course.day_w} htmlFor={`modal-${course.subject_code}-${course.time_from}-${course.time_to}-${course.day_w}`} start={start} end={end} className={clsx("flex cursor-pointer flex-col overflow-hidden bg-base-200 p-2 hover:bg-base-300")}>
        <div className="flex justify-between">
          <Text>{course.subject_code}</Text>
          {expand && (
            <Text>
              [{course.time_from} - {course.time_to}]
            </Text>
          )}
        </div>
        <Text>{LocaleSwip(locale!, course.subject_name_th, course.subject_name_en)}</Text>
        <Text className="flex gap-1">
          <Icon icon="material-symbols:location-on" className="text-lg" /> {LocaleSwip(locale!, course.room_name_th, course.room_name_en)}
        </Text>
        {expand && (
          <>
            <Text className="flex gap-2">
              <div>{LocaleSwip(locale!, "หมู่", "Section")}</div>
              <div>{course.section_code}</div>
            </Text>
            <div className="flex items-center gap-2">
              <div className={clsx("badge badge-sm", course.section_type_en === "Lecture" || course.section_type_th === "บรรยาย" ? "badge-primary" : "badge-secondary")}>{LocaleSwip(locale!, course.section_type_th, course.section_type_en)}</div>
              {!(canRemove || canEdit) && (
                <>
                  {course.std_status_en === "Special" || course.section_type_th === "พิเศษ" ? (
                    <>
                      <GoldrenBadge className="badge badge-sm border-0 text-white">{LocaleSwip(locale!, course.std_status_th, course.std_status_en)}</GoldrenBadge>
                    </>
                  ) : (
                    <>
                      <div className="badge badge-accent badge-sm">{LocaleSwip(locale!, course.std_status_th, course.std_status_en)}</div>
                    </>
                  )}
                </>
              )}
              {(canRemove || canEdit) && (
                <Tag color={colorCreditMap[course.max_credit! - 1]}>
                  {LocaleSwip(locale!, "หน่วยกิต : ", "Credit : ")}
                  {course.max_credit}
                </Tag>
              )}
            </div>
          </>
        )}
      </StyleCss>
      <input type="checkbox" id={`modal-${course.subject_code}-${course.time_from}-${course.time_to}-${course.day_w}`} className="modal-toggle" />
      <label htmlFor={`modal-${course.subject_code}-${course.time_from}-${course.time_to}-${course.day_w}`} className="modal cursor-pointer">
        <label ref={area} className="modal-box relative flex flex-col gap-3" htmlFor="">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Text className="text-2xl">{course.subject_code}</Text>
              <Icon
                onClick={async () => {
                  await navigator.clipboard.writeText(`${course.subject_code} ${course.subject_name_en}`);
                  toast.success("Copied");
                }}
                icon="ph:copy"
                className="cursor-pointer text-xl"
              />
              {/* <Button
                className="flex max-w-[10rem] justify-start truncate text-start"
                onClick={() => {
                  navigator.clipboard.writeText(`${course.subject_code} ${course.subject_name_en}`);
                }}
              >
                Copy Name
              </Button> */}
            </div>
            <Text className="text-2xl">
              [{course.time_from} - {course.time_to}]
            </Text>
          </div>
          <div className="flex flex-col">
            <Text className="text-lg">{LocaleSwip(locale!, course.subject_name_th, course.subject_name_en)}</Text>
          </div>
          <div className="flex flex-col">
            <Text>
              {LocaleSwip(locale!, "วัน :", "Day :")} <Tag color={dayColorMap.filter((day) => day.day === course.day_w.trim())[0]?.color}>{course.day_w}</Tag>
            </Text>
            <Text>
              {LocaleSwip(locale!, "ห้อง :", "Room :")} {LocaleSwip(locale!, course.room_name_th, course.room_name_en)}
            </Text>
            <Text className="flex gap-2">
              <div>{LocaleSwip(locale!, "หมู่ :", "Section :")}</div>
              <div>{course.section_code}</div>
            </Text>
          </div>
          <div>
            <Text>
              {LocaleSwip(locale!, "อาจารย์ :", "Teacher :")}{" "}
              {locale === "th" ? (course.teacher_name ? TeacherSeparate(course.teacher_name).map((name, tid) => <div key={tid}>- {name}</div>) : "") : course.teacher_name_en ? TeacherSeparate(course.teacher_name_en).map((name, tid) => <div key={tid}>- {name}</div>) : ""}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <div className={clsx("badge", course.section_type_en === "Lecture" || course.section_type_th === "บรรยาย" ? "badge-primary" : "badge-secondary")}>{LocaleSwip(locale!, course.section_type_th, course.section_type_en)}</div>
            {!(canRemove || canEdit) && (
              <>
                {course.std_status_en === "Special" || course.section_type_th === "พิเศษ" ? (
                  <>
                    <GoldrenBadge className="badge border-0 text-white">{LocaleSwip(locale!, course.std_status_th, course.std_status_en)}</GoldrenBadge>
                  </>
                ) : (
                  <>
                    <div className="badge badge-accent">{LocaleSwip(locale!, course.std_status_th, course.std_status_en)}</div>
                  </>
                )}
              </>
            )}
            {(canRemove || canEdit) && (
              <Tag color={colorCreditMap[course.max_credit! - 1]}>
                {LocaleSwip(locale!, "หน่วยกิต : ", "Credit : ")}
                {course.max_credit}
              </Tag>
            )}
          </div>

          {canRemove || canEdit ? (
            <div className="flex gap-1">
              {canRemove && (
                <Button className="w-fit" danger onClick={() => onRemove!(course)}>
                  Remove
                </Button>
              )}
              {canEdit && <EditCourse course={course} />}
            </div>
          ) : (
            ""
          )}
        </label>
      </label>
    </>
  );
};

export default BarChildren;
