import useLocalsSwip from "@/hooks/useLocalsSwip";
import { NextPage } from "next";
import Table from "../Table";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useLocalStorage } from "usehooks-ts";
import { Icon } from "@iconify/react";
import SearchSubject from "./SearchSubject";
import _ from "lodash";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import calculateCredits from "@/utils/calculateCredits";
import AddCourse from "./AddCourse";
import { api } from "@/utils/api";
import CryptoJS from "crypto-js";
import { PageLoading } from "@ant-design/pro-components";
interface Props {
  isIPhone: boolean;
}

const CustomTimeTable: NextPage<Props> = ({ isIPhone }) => {
  const { LocalsSwip } = useLocalsSwip();
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom04", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const getSyncCoursesApi = api.sync.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const syncCoursesApi = api.sync.sync.useMutation();

  const CourseSorting = (courses: Course[]) => {
    const sortedItems = _.orderBy(courses, ["time_start"], "asc");
    return sortedItems;
  };

  const exportTableJsonFile = () => {
    const json = JSON.stringify(Courses);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(
      blob,
      `timetable-${dayjs(new Date()).format("YYYY-MM-DD HHmmss")}.json`
    );
  };

  const importTableJsonFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result;
      if (typeof json === "string") {
        try {
          const data = JSON.parse(json) as Course[];
          if (
            !data[0]?.day_w ||
            !data[0]?.section_code ||
            !data[0]?.time_from ||
            !data[0]?.uuid
          ) {
            return toast.error(
              LocalsSwip(
                "ไม่สามารถนำเข้าไฟล์นี้ได้ กรุณาตรวจสอบอีกครั้ง",
                "Cannot import this file. Please check again."
              )
            );
          }
          SetCourses(data);
        } catch (error) {
          return toast.error(
            LocalsSwip(
              "ไม่สามารถนำเข้าไฟล์นี้ได้ กรุณาตรวจสอบอีกครั้ง",
              "Cannot import this file. Please check again."
            )
          );
        }
      } else {
        return toast.error(
          LocalsSwip(
            "ไม่สามารถนำเข้าไฟล์นี้ได้ กรุณาตรวจสอบอีกครั้ง",
            "Cannot import this file. Please check again."
          )
        );
      }
    };
    reader.readAsText(file);
  };

  const onRemove = (course: Course) => {
    let coursesAll = Courses;
    _.remove(
      coursesAll,
      (c) =>
        c.subject_code === course.subject_code &&
        c.max_credit === course.max_credit
    );
    SetCourses(coursesAll);
  };

  useEffect(() => {
    if (getSyncCoursesApi.data && getSyncCoursesApi.data.length > 0) {
      SetCourses(getSyncCoursesApi.data);
    }
  }, [getSyncCoursesApi.data]);

  const saveTableOnServer = async () => {
    syncCoursesApi.mutate(
      {
        courseData: Courses,
      },
      {
        onSuccess: () => {
          toast.success(
            LocalsSwip("บันทึกตารางเรียนสำเร็จ", "Save table successfully")
          );
          getSyncCoursesApi.refetch();
        },
      }
    );
  };

  const checkIsSameCourse = (
    courseLocal: Course[] | undefined,
    courseServer: Course[] | undefined
  ) => {
    if (
      (courseLocal && courseLocal.length === 0) ||
      (courseServer && courseServer.length === 0)
    )
      return false;
    const hashLocal = CryptoJS.SHA256(JSON.stringify(courseLocal)).toString(
      CryptoJS.enc.Hex
    );
    const hashServer = CryptoJS.SHA256(JSON.stringify(courseServer)).toString(
      CryptoJS.enc.Hex
    );
    return hashLocal === hashServer;
  };

//   useEffect(() => {
//     if (Courses.length > 0) {
//       const isSame = checkIsSameCourse(getSyncCoursesApi.data, Courses);
//       if (!isSame) {
//         saveTableOnServer();
//       }
//     }
//   }, [Courses]);

  return (
    <>
      <SearchSubject
        onIsModalOpen={(v) => setIsModalOpen(v)}
        isModalOpen={isModalOpen}
        onSelect={(v) => {
          let newCourses = v.map((course) => ({ ...course, uuid: uuid() }));
          SetCourses((pre) => [...pre, ...newCourses]);
        }}
      />
      <div className="flex flex-col gap-3">
        {!getSyncCoursesApi.isLoading ? (
          <>
            {Courses.length !== 0 ? (
              <Table
                isIPhone={isIPhone}
                courseData={CourseSorting(Courses)}
                canRemove={true}
                onRemove={onRemove}
                hasShare={true}
                canEdit={true}
                childrenBar={
                  <>
                    <input
                      ref={inputRef}
                      type="file"
                      onChange={importTableJsonFile}
                      style={{ display: "none" }}
                    />
                    <div
                      onClick={exportTableJsonFile}
                      className="btn-outline btn-primary btn-sm btn gap-2 uppercase"
                    >
                      <Icon icon="tabler:table-import" className="text-lg" />{" "}
                      Export
                    </div>
                    <div
                      onClick={() => {
                        inputRef.current?.click();
                      }}
                      className="btn-outline btn-primary btn-sm btn gap-2 uppercase"
                    >
                      <Icon icon="tabler:table-export" className="text-lg" />{" "}
                      Import
                    </div>
                    <AddCourse />
                    <div className="flex justify-end ">
                      <button className="btn-outline btn-primary disabled btn-sm btn gap-3">
                        {LocalsSwip("หน่วยกิตรวม", "Total Credit")}
                        <div className="badge-secondary badge">
                          {calculateCredits(Courses)}
                        </div>
                      </button>
                    </div>
                  </>
                }
                childrenFooterBar={
                  <>
                    <div className="flex justify-end md:mr-3 md:grow">
                      <div
                        onClick={saveTableOnServer}
                        className="btn-outline btn-primary btn-sm btn items-center gap-2"
                      >
                        <Icon
                          icon={
                            checkIsSameCourse(getSyncCoursesApi.data, Courses)
                              ? "material-symbols:cloud-done"
                              : "material-symbols:cloud-off-outline"
                          }
                          className="text-lg"
                        />
                        {LocalsSwip(
                          "ซิงค์ทุกอุปกรณ์",
                          "Sync all devices"
                        )}
                      </div>
                    </div>
                  </>
                }
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 border-[1px] border-base-content p-5">
                <div className="flex gap-2">
                  <>
                    <input
                      ref={inputRef}
                      type="file"
                      onChange={importTableJsonFile}
                      style={{ display: "none" }}
                    />
                    <div
                      onClick={() => {
                        inputRef.current?.click();
                      }}
                      className="btn-outline btn-primary btn-sm btn gap-2 uppercase"
                    >
                      <Icon icon="tabler:table-export" className="text-lg" />{" "}
                      Import
                    </div>
                  </>
                </div>
                {LocalsSwip(
                  "คุณยังไม่มีจัดตารางเรียน",
                  "You don't have timetable"
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <PageLoading />
          </>
        )}
      </div>
    </>
  );
};

export default CustomTimeTable;
