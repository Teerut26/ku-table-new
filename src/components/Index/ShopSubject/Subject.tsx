import useCSSVariableToCSSHexCode from "@/hooks/useCSSVariableToCSSHexCode";
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
  Grid,
  Button,
} from "@mui/material";
import clsx from "clsx";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import useSearchStore from "./store/useSearchStore";
import useCartSubjectStore from "@/stores/useCartSubjectStore";
import { toast } from "react-hot-toast";
import { checkCanAdd, sha256 } from "@/utils/hashCourse";

interface Props {
  subject: OpenSubjectForEnrollInterface;
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

const Subject: NextPage<Props> = ({ subject }) => {
  const { LocalsSwip } = useLocalsSwip();
  const { addCourse, courses } = useCartSubjectStore((state) => state);
  const { locale } = useRouter();
  const [isCollapse, setIsCollapse] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const addCourseToCart = () => {
    console.log(sha256(subject));
    console.log(subject.uuid);

    addCourse(subject);
    toast.success(
      LocalsSwip(
        "เพิ่มรายวิชาลงตะกร้าเรียบร้อยแล้ว",
        "Add course to cart successfully"
      )
    );
  };

  const checkAdded = () => {
    const hash = courses.filter((course) => course.uuid === sha256(subject));
    return hash.length > 0;
  };

  return (
    <>
      <Paper variant="outlined" className="relative pb-14 md:pb-0">
        {/* <div
          className={clsx(
            "absolute bottom-3 right-3 gap-3",
            isMobile && "left-3"
          )}
        >
          <Button
            onClick={addCourseToCart}
            size="large"
            variant={checkAdded() ? "outlined" : "contained"}
            sx={{ boxShadow: 0, width: "100%" }}
            startIcon={
              <Icon icon="material-symbols:add-rounded" className="text-2xl" />
            }
          >
            {LocalsSwip("เลือก", "select")}
          </Button>
        </div> */}
        <CardHeader
          title={
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-x-4 ">
                <Typography sx={{ fontWeight: "bold" }} variant="body1">
                  {subject.subjectCode}{" "}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.5 }}>
                  [ {subject.maxCredit} {LocalsSwip("หน่วยกิต", "Credit")} ]
                </Typography>
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
                          {date.day_w} {date.time_form} - {date.time_to}
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
