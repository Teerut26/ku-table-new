import { Course } from "@/interfaces/GroupCourseResponseInterface";
import LocaleSwip from "@/utils/localeSwip";
import styled from "@emotion/styled";
import clsx from "clsx";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import saveAs from "file-saver";

interface Props {
  start: number;
  end: number;
  course: Course;
}

interface getCourseDataInterface {
  start: number;
  end: number;
}

const StyleCss = styled.label<getCourseDataInterface>`
  grid-column: ${(props) => props.start} / ${(props) => props.end};
  border: 0.5px solid;
  min-height: 7rem;
`;

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

const BarChildren: NextPage<Props> = ({ start, end, course }) => {
  const { locale } = useRouter();
  const [isCapture, setIsCapture] = useState(false);
  const area = useRef<HTMLLabelElement>(null);

  const handleDownload = async () => {
    const scale = 1;
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
      const name = `kutable-${course.subject_code}.png`;
      saveAs(dataUrl, name);
      setIsCapture(false);
    }, 1000);
  };

  return (
    <>
      <StyleCss
        htmlFor={`modal-${course.subject_code}-${course.time_from}-${course.time_to}`}
        start={start}
        end={end}
        className="flex cursor-pointer flex-col p-2 hover:bg-base-200"
      >
        <div className="flex justify-between">
          <Text>{course.subject_code}</Text>
          <Text>
            [{course.time_from} - {course.time_to}]
          </Text>
        </div>
        <Text>
          {LocaleSwip(locale!, course.subject_name_th, course.subject_name_en)}
        </Text>
        <Text>
          {LocaleSwip(locale!, "ห้อง", "Room")}{" "}
          {LocaleSwip(locale!, course.room_name_th, course.room_name_en)}
        </Text>
        <Text className="flex gap-2">
          <div>{LocaleSwip(locale!, "หมู่", "Section")}</div>
          <div>{course.section_code}</div>
        </Text>
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
                <div className="badge-accent badge badge-sm">
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
      </StyleCss>
      <input
        type="checkbox"
        id={`modal-${course.subject_code}-${course.time_from}-${course.time_to}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`modal-${course.subject_code}-${course.time_from}-${course.time_to}`}
        className="modal cursor-pointer"
      >
        <label ref={area} className="modal-box relative flex flex-col gap-3" htmlFor="">
          <div className="flex justify-between">
            <Text className="text-2xl">{course.subject_code}</Text>
            <Text className="text-2xl">
              [{course.time_from} - {course.time_to}]
            </Text>
          </div>
          <div className="flex flex-col">
            <Text className="text-lg">
              {LocaleSwip(
                locale!,
                course.subject_name_th,
                course.subject_name_en
              )}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text>
              {LocaleSwip(locale!, "ห้อง :", "Room :")}{" "}
              {LocaleSwip(locale!, course.room_name_th, course.room_name_en)}
            </Text>
            <Text className="flex gap-2">
              <div>{LocaleSwip(locale!, "หมู่ :", "Section :")}</div>
              <div>{course.section_code}</div>
            </Text>
          </div>
          <div>
            <Text>
              {LocaleSwip(locale!, "อาจารย์ :", "Teacher :")}{" "}
              {locale === "th"
                ? course.teacher_name
                    .split(",")
                    .map((name, tid) => <div key={tid}>- {name}</div>)
                : course.teacher_name_en
                    .split(",")
                    .map((name, tid) => <div key={tid}>- {name}</div>)}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "badge",
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
                  <GoldrenBadge className="badge border-0 text-white">
                    {LocaleSwip(
                      locale!,
                      course.std_status_th,
                      course.std_status_en
                    )}
                  </GoldrenBadge>
                </>
              ) : (
                <>
                  <div className="badge-accent badge">
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
          {/* {!isCapture && (
            <div className="flex justify-end gap-2">
              <div
                onClick={() => handleDownload()}
                className="btn-outline btn-primary btn-sm btn"
              >
                <CameraAltIcon sx={{ width: 20 }} />
              </div>
            </div>
          )} */}
        </label>
      </label>
    </>
  );
};

export default BarChildren;
