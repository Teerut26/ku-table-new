import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { convertKeyToColor } from "@/utils/colorsMap";
import { css } from "@emotion/css";
import clsx from "clsx";
import { NextPage } from "next";
import useTableStore from "../Table/store/useTableStore";
import { Icon } from "@iconify/react";
import TeacherSeparate from "@/utils/teacherSeparate";

interface Props {
  course: Course;
}

const CourseCardMobile: NextPage<Props> = ({ course }) => {
  const { LocalsSwip } = useLocalsSwip();
  const { expand, imageBackground, opacityTable } = useTableStore((r) => r);
  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden rounded-xl bg-base-200 p-5",
        css`
          background-color: hsl(
            var(--b2, var(--b1)) / ${imageBackground ? opacityTable : "1"}
          );
        `
      )}
    >
      {!expand && (
        <div
          className={css`
            position: absolute;
            bottom: 0;
            right: 0;
            /* background-color: ${convertKeyToColor(course.day_w)?.bgHex}; */
            /* color: ${convertKeyToColor(course.day_w)?.textHex}; */
            width: auto;
            padding: 0rem 0.5rem;
            border-radius: 10px 0 0 0;
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
          `}
        >
          <div>{LocalsSwip(course.room_name_th, course.room_name_en)}</div>
        </div>
      )}
      <div className="flex w-full">
        <div
          className={clsx(
            "relative flex w-full flex-col pl-4",
            css`
              ::before {
                content: "";
                width: 5px;
                height: 100%;
                background-color: ${convertKeyToColor(course.day_w)?.textHex};
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                border-radius: 0.5rem;
              }
            `
          )}
        >
          <div className="flex w-full justify-between">
            <div className="text-lg font-bold leading-none">
              {course.subject_code}
            </div>
            <div className="font-light leading-none text-base-content/40">
              {LocalsSwip("หมู่เรียน", "Section")} {course.section_code}
            </div>
          </div>
          <div className="truncate font-light">
            {LocalsSwip(course.subject_name_th, course.subject_name_en)}
          </div>
          <div className="flex gap-1">
            {!expand && (
              <>
                <div className="font-bold">{course.day_w}</div>|
                <div className="font-light">
                  {course.time_from} - {course.time_to}
                </div>
                |
              </>
            )}
            {expand && (
              <>
                <div className="font-light text-base-content/50">
                  {course.teacher_name &&
                    LocalsSwip(
                      TeacherSeparate(course.teacher_name)[0]!,
                      TeacherSeparate(course.teacher_name_en)[0]!
                    )}{" "}
                  |
                </div>
              </>
            )}
            <div className="font-light text-base-content/50">
              {LocalsSwip(course.section_type_th, course.section_type_en)}
            </div>
          </div>
        </div>
      </div>
      {expand && (
        <div className="mt-2 flex flex-col pl-4">
          <div className="flex gap-5 pl-2">
            <div className="font-bold">{course.day_w}</div>
            <div className="flex flex-col">
              <div className="font-light">
                {course.time_from} - {course.time_to}
              </div>
              <div className="flex text-sm font-light text-base-content/40">
                <Icon
                  icon="material-symbols:location-on"
                  className="text-lg text-base-content/20"
                />{" "}
                {LocalsSwip(course.room_name_th, course.room_name_en)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCardMobile;
