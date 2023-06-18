import useLocalsSwip from "@/hooks/useLocalsSwip";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import { convertKeyToColor } from "@/utils/colorsMap";
import CourseDateSeparate from "@/utils/courseDateSeparate";
import { convertKeyToDate } from "@/utils/daysMap";
import RoomSeparate from "@/utils/roomSeparate";
import TeacherSeparate from "@/utils/teacherSeparate";
import styled from "@emotion/styled";
import { Icon } from "@iconify/react";
import {
  Paper,
  CardHeader,
  Typography,
  Chip,
  IconButton,
  Collapse,
  CardContent,
  Button,
} from "@mui/material";
import clsx from "clsx";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import useCartSubjectStore from "@/stores/useCartSubjectStore";
import { toast } from "react-hot-toast";
import _ from "lodash";
import useFilterStore from "@/stores/useFilterStore";
import checkTimeConflict from "@/utils/checkTimeConflict";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { Alert, Tooltip } from "antd";
import { css } from "@emotion/css";
import { ClasseInterface } from "@/interfaces/ClassesInterface";
import Link from "next/link";

interface Props {
  subject: OpenSubjectForEnrollInterface;
  classe: ClasseInterface | undefined;
}

interface ChipDayProps {
  day_w?: string;
}

const ChipDay = styled(Chip)<ChipDayProps>`
  color: ${({ day_w }) => (day_w ? convertKeyToColor(day_w)?.textHex : "gray")};
  background-color: ${({ day_w }) =>
    day_w ? convertKeyToColor(day_w)?.bgHex : "#e0e0e0"};
`;

interface ChipSectionTypeProps {
  type: string;
}

const ChipSectionType = styled(Chip)<ChipSectionTypeProps>`
  color: ${({ type }) => (type === "Lecture" ? "#0c5a93" : "#eb9c03")};
  background-color: ${({ type }) =>
    type === "Lecture" ? "#daeffe" : "#fff2c4"};
`;

interface ChipSectionStdTypeProps {
  type: string;
}

const ChipSectionStdType = styled(Chip)<ChipSectionStdTypeProps>`
  color: ${({ type }) => (type === "Regular" ? "#0c5a93" : "#eb9c03")};
  background-color: ${({ type }) =>
    type === "Regular" ? "#daeffe" : "#fff2c4"};
`;

const Subject: NextPage<Props> = ({ subject, classe }) => {
  const { LocalsSwip } = useLocalsSwip();
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom04", []);
  const { addCourse, courses, removeCourse } = useCartSubjectStore(
    (state) => state
  );
  const { locale } = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { expandAll } = useFilterStore((state) => state);
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  useEffect(() => {
    setIsCollapse(expandAll);
  }, [expandAll]);

  const checkCourseExist = () => {
    return _.some(courses, {
      subject_code: subject.subjectCode,
      max_credit: subject.maxCredit,
    });
  };

  const addCourseToCart = () => {
    if (CourseDateSeparate(subject.coursedate).length <= 0) {
      toast.error(
        LocalsSwip(
          "ไม่สามารถเพิ่มรายวิชาที่ไม่มีวันที่เรียนได้",
          "Cannot add subject without class date."
        )
      );
      return;
    }

    if (checkCourseExist()) {
      toast.error(
        LocalsSwip(
          "ไม่สามารถเพิ่มรายวิชาที่เลือกซ้ำได้",
          "Cannot add subject that already added."
        )
      );
      return;
    }

    addCourse(subject);
    toast.success(
      LocalsSwip(
        "เพิ่มรายวิชาลงตะกร้าเรียบร้อยแล้ว",
        "Add course to cart successfully"
      )
    );
  };

  const removeCourseFromCart = () => {
    removeCourse({
      day_w: "",
      subject_code: subject.subjectCode,
      max_credit: subject.maxCredit,
      section_id: 0,
      groupheader: "",
      weekstartday: "",
      weekendday: "",
      std_id: "",
      subject_name_th: "",
      subject_name_en: "",
      section_code: "",
      section_type: "",
      section_type_th: "",
      section_type_en: "",
      student_status_code: "",
      std_status_th: "",
      std_status_en: "",
      teacher_name: "",
      teacher_name_en: "",
      day_w_c: "",
      time_from: "",
      time_to: "",
      room_name_th: "",
      room_name_en: "",
      time_start: 0,
    });

    toast.success(
      LocalsSwip(
        "ลบรายวิชาออกจากตะกร้าเรียบร้อยแล้ว",
        "Remove course from cart successfully"
      )
    );
  };

  const isConflict = () => {
    try {
      const subjectDate = CourseDateSeparate(subject.coursedate, subject);
      let isConflictT: Course[] = [];
      subjectDate.map((date) => {
        isConflictT = [
          ...isConflictT,
          ...checkTimeConflict(
            {
              day_w: date.day_w!,
              time_from: date.time_from!,
              time_to: date.time_to!,
            },
            Courses
          ),
        ];
      });
      return isConflictT.length > 0 ? isConflictT : null;
    } catch (error) {
      return null;
    }
  };

  isConflict();

  return (
    <>
      <Paper variant="outlined" className="relative pb-14 md:pb-0">
        <div
          className={clsx(
            "absolute bottom-3 right-3 gap-3",
            isMobile && "left-3"
          )}
        >
          {CourseDateSeparate(subject.coursedate).length <= 0 ? (
            <Button
              size="large"
              variant={"contained"}
              disabled={CourseDateSeparate(subject.coursedate).length <= 0}
              sx={{ boxShadow: 0, width: "100%" }}
              startIcon={
                <Icon
                  icon="material-symbols:add-rounded"
                  className="text-2xl"
                />
              }
            >
              {LocalsSwip("เลือก", "select")}
            </Button>
          ) : (
            <Button
              onClick={
                !checkCourseExist() ? addCourseToCart : removeCourseFromCart
              }
              size="large"
              variant={checkCourseExist() ? "outlined" : "contained"}
              disabled={CourseDateSeparate(subject.coursedate).length <= 0}
              sx={{ boxShadow: 0, width: "100%" }}
              startIcon={
                !checkCourseExist() ? (
                  <Icon
                    icon="material-symbols:add-rounded"
                    className="text-2xl"
                  />
                ) : (
                  <Icon icon="ic:baseline-check" className="text-2xl" />
                )
              }
            >
              {LocalsSwip("เลือก", "select")}
            </Button>
          )}
        </div>
        <CardHeader
          title={
            <div className="flex flex-col gap-2 overflow-hidden">
              {isConflict() && (
                <Alert
                  message={
                    <div className="flex gap-2 text-error">
                      <Icon
                        icon="ph:warning-circle-bold"
                        className="text-2xl text-error"
                      />
                      {LocalsSwip("เวลาเรียนชนกับ", "Time conflict with")}
                    </div>
                  }
                  className={clsx(
                    "overflow-hidden truncate",
                    css`
                      padding: 10px !important;
                      border-width: 0px !important;
                    `
                  )}
                  type="error"
                  description={
                    <div className="gap-x-3font-bold flex w-full flex-col text-error">
                      {isConflict()?.map((date, index) => (
                        <div
                          key={index}
                          className="ml-5 max-w-[14rem] truncate font-bold md:max-w-full"
                        >
                          - ({date.subject_code}){" "}
                          {LocalsSwip(
                            date.subject_name_th,
                            date.subject_name_en
                          )}
                        </div>
                      ))}
                    </div>
                  }
                />
              )}
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-x-4 ">
                  <Typography sx={{ fontWeight: "bold" }} variant="body1">
                    {classe ? (
                      <div className="flex items-center gap-2">
                        <Link
                          title={LocalsSwip(
                            "ดูรีวิวใน KU Clap",
                            "Reviews in KU Clap"
                          )}
                          href={`https://www.kuclap.com/${classe.classId}`}
                          target="_blank"
                        >
                          <Icon icon="ic:outline-launch" className="text-xl" />
                        </Link>
                        {subject.subjectCode}{" "}
                      </div>
                    ) : (
                      subject.subjectCode
                    )}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.5 }}>
                    [ {subject.maxCredit} {LocalsSwip("หน่วยกิต", "Credit")} ]
                  </Typography>
                </div>
              </div>
            </div>
          }
          subheader={
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div>{subject.subjectNameTh}</div>
                <div>{subject.subjectNameEn}</div>
              </div>
              <div className="flex flex-col">
                <Typography variant="caption">
                  {LocalsSwip("วันที่เรียน", "Class Date")}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {subject.coursedate &&
                  CourseDateSeparate(subject.coursedate).length > 0 ? (
                    CourseDateSeparate(subject.coursedate).map(
                      (date, index) => (
                        <ChipDay
                          day_w={date.day_w!}
                          key={index}
                          label={LocalsSwip(
                            convertKeyToDate(date.day_w!)?.th!,
                            convertKeyToDate(date.day_w!)?.en!
                          )}
                          size="small"
                          color="warning"
                        />
                      )
                    )
                  ) : (
                    <ChipDay
                      label={LocalsSwip("ไม่ระบุ", "Not specified")}
                      size="small"
                      color="warning"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col">
                  <Typography variant="caption">
                    {LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    <ChipSectionType
                      label={LocalsSwip(
                        `${subject.sectionTypeTh} (${LocalsSwip(
                          "หมู่",
                          "Sec"
                        )}: ${subject.sectionCode})`,
                        `${subject.sectionTypeEn} (${LocalsSwip(
                          "หมู่",
                          "Sec"
                        )}: ${subject.sectionCode})`
                      )}
                      type={subject.sectionTypeEn}
                      size="small"
                    />
                    <ChipSectionStdType
                      label={LocalsSwip(
                        subject.stdStatusTh,
                        subject.stdStatusEn
                      )}
                      type={subject.stdStatusEn}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          action={
            <>
              <IconButton onClick={handleCollapse}>
                {isCollapse ? (
                  <Icon
                    icon="material-symbols:keyboard-arrow-up"
                    className="text-3xl"
                  />
                ) : (
                  <Icon
                    icon="material-symbols:keyboard-arrow-down"
                    className="text-3xl"
                  />
                )}
              </IconButton>
            </>
          }
        />
        <Collapse in={isCollapse}>
          <CardContent>
            <div className="flex flex-wrap gap-5 md:gap-10">
              <div className="flex flex-col">
                <Typography variant="caption" sx={{ opacity: 0.5 }}>
                  {LocalsSwip("ครู", "Teacher")}
                </Typography>
                {locale === "th"
                  ? subject.teacherName
                    ? TeacherSeparate(subject.teacherName).map((name, tid) => (
                        <div key={tid}>{name}</div>
                      ))
                    : ""
                  : subject.teacherNameEn
                  ? TeacherSeparate(subject.teacherNameEn).map((name, tid) => (
                      <div key={tid}>{name}</div>
                    ))
                  : ""}
              </div>
              <div className="flex flex-col">
                <Typography variant="caption" sx={{ opacity: 0.5 }}>
                  {LocalsSwip("เวลา", "Time")}
                </Typography>
                {subject.coursedate &&
                CourseDateSeparate(subject.coursedate).length > 0
                  ? CourseDateSeparate(subject.coursedate).map(
                      (date, index) => (
                        <div key={index}>
                          {date.day_w} {date.time_from} - {date.time_to}
                        </div>
                      )
                    )
                  : LocalsSwip("ไม่ระบุ", "Not specified")}
              </div>
              <div className="flex flex-col">
                <Typography variant="caption" sx={{ opacity: 0.5 }}>
                  {LocalsSwip("ห้อง", "Room")}
                </Typography>
                {RoomSeparate(subject.roomNameEn).map((date, index) => (
                  <div key={index}>{date.room}</div>
                ))}
              </div>
              <div className="flex flex-col">
                <Typography variant="caption" sx={{ opacity: 0.5 }}>
                  {LocalsSwip("สาขาชั้นปีที่มีสิทธิ์", "Eligible Major")}
                </Typography>
                {RoomSeparate(subject.property).map((date, index) => (
                  <div key={index}>{date.room}</div>
                ))}
              </div>
              <div className="flex flex-col">
                <Typography variant="caption" sx={{ opacity: 0.5 }}>
                  {LocalsSwip("จำนวนรับ", "Total Seat")}
                </Typography>
                <div>
                  {subject.totalRegistered}/{subject.totalSeat}
                </div>
              </div>
            </div>
          </CardContent>
        </Collapse>
      </Paper>
    </>
  );
};

export default Subject;
