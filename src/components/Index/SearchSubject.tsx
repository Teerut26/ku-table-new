import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import { SearchSubjectOpenEnrResponseInterface } from "@/interfaces/SearchSubjectOpenEnrResponseInterface";
import { api } from "@/utils/api";
import { Input, List, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
interface Props {
  isModalOpen: boolean;
  onSelect: (subject: Course[]) => void;
  onIsModalOpen: (isModalOpen: boolean) => void;
}

const SearchSubject: NextPage<Props> = ({
  isModalOpen,
  onSelect,
  onIsModalOpen,
}) => {
  const { locale } = useRouter();
  const [keyword, setKeyword] = useState("");
  const [SelectSubject, setSelectSubject] = useState<
    SearchSubjectOpenEnrResponseInterface | undefined
  >();
  const subjectSearchtApi = api.subject.search.useMutation();
  const subjectstApi = api.subject.gets.useMutation();
  const { LocalsSwip } = useLocalsSwip();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword === "") return;
      subjectSearchtApi.mutateAsync(keyword);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyword]);
  const handleOk = () => {
    onIsModalOpen(false);
  };
  const handleCancel = () => {
    onIsModalOpen(false);
  };
  const onSelectSubject = async (
    subject: SearchSubjectOpenEnrResponseInterface
  ) => {
    await subjectstApi.mutateAsync({
      query: subject.subjectCode,
    });
    setSelectSubject(subject);
  };
  const CourseDateSeparate = (date: string) => {
    try {
      const result = date.split(",").map((schedule) => {
        const day = schedule.split("  ")[0];
        const time_form = schedule.split("  ")[1]?.split("-")[0]?.trim();
        const time_to = schedule.split("  ")[1]?.split("-")[1]?.trim();
        return {
          day_w: day,
          time_form: time_form,
          time_to: time_to,
        };
      });

      return result;
    } catch (error) {
      return [];
    }
  };
  const RoomSeparate = (room: string) => {
    const result = room.split(",").map((room) => {
      return {
        room: room,
      };
    });
    return result;
  };
  const onSelectSubjectOk = (subject: OpenSubjectForEnrollInterface) => {
    const newCourse = CourseDateSeparate(subject.coursedate).map(
      (date, index) => {
        const rspEN = RoomSeparate(subject.roomNameEn);
        const rspTH = RoomSeparate(subject.roomNameTh);

        return {
          subject_code: subject.subjectCode,
          subject_name_en: subject.subjectNameEn,
          subject_name_th: subject.subjectNameTh,
          section_code: subject.sectionCode,
          room_name_en: rspEN.length > 1 ? rspEN[index]?.room : rspEN[0]?.room,
          room_name_th: rspTH.length > 1 ? rspTH[index]?.room : rspTH[0]?.room,
          section_type_en: subject.sectionTypeEn,
          section_type_th: subject.sectionTypeTh,
          teacher_name: subject.teacherName,
          teacher_name_en: subject.teacherNameEn,
          day_w: date.day_w,
          time_to: date.time_to,
          time_from: date.time_form,
          time_start: dayjs(date.time_form, "HH:mm").diff(
            dayjs("00:00", "HH:mm"),
            "minute"
          ),
          max_credit: subject.maxCredit,
        } as Course;
      }
    );
    toast.success(LocalsSwip("เพิ่มวิชาเรียบร้อยแล้ว", "Add course success"));
    onSelect(newCourse);
    onIsModalOpen(false);
  };

  useEffect(() => {
    if (subjectSearchtApi.isLoading || subjectstApi.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [subjectSearchtApi.isLoading, subjectstApi.isLoading]);

  const [subjectstDataSearch, setSubjectstDataSearch] =
    useState<OpenSubjectForEnrollInterface[]>();

  useEffect(() => {
    if (subjectstApi.data && subjectstApi.data.results.length > 0) {
      setSubjectstDataSearch(subjectstApi.data.results);
    }
  }, [subjectstApi.data]);

  const onSearchByTeacherName = async (teacherName: string) => {
    if (teacherName === "") {
      setSubjectstDataSearch(subjectstApi.data?.results);
      return;
    }
    const searchResult = subjectstApi.data?.results.filter(
      (subject) =>
        subject.teacherNameEn.toLowerCase().match(teacherName) ||
        subject.teacherName.toLowerCase().match(teacherName)
    );
    setSubjectstDataSearch(searchResult);
  };

  return (
    <>
      <Modal
        title={LocalsSwip("ค้นหาวิชา", "Search Subject")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col gap-2">
          <Input
            onChange={(e) => {
              if (e.target.value === "") {
                setSelectSubject(undefined);
                subjectSearchtApi.reset();
              }
              setKeyword(e.target.value);
              setSelectSubject(undefined);
            }}
            size="large"
            placeholder="รหัสวิชา, ชื่อวิชา"
          />
          {!SelectSubject ? (
            <List loading={subjectSearchtApi.isLoading}>
              {subjectSearchtApi.data &&
                subjectSearchtApi.data?.subjects.map((subject, index) => (
                  <List.Item
                    key={index}
                    onClick={() => onSelectSubject(subject)}
                    className="cursor-pointer rounded-md hover:bg-base-200"
                  >
                    <List.Item.Meta
                      className="px-3"
                      title={<div>{subject.subjectCode}</div>}
                      description={
                        <div className="flex flex-col">
                          <span>{subject.subjectNameTh}</span>
                          <span>{subject.subjectNameEn}</span>
                        </div>
                      }
                    />
                  </List.Item>
                ))}
            </List>
          ) : (
            <div className="flex flex-col">
              {subjectstApi.data && subjectstApi.data?.results.length > 0 && (
                <Input
                  placeholder={LocalsSwip(
                    "ค้นหาชื่ออาจารย์",
                    "Search by teacher name"
                  )}
                  onChange={(e) => onSearchByTeacherName(e.target.value)}
                />
              )}

              <List loading={subjectstApi.isLoading}>
                {subjectstDataSearch && subjectstDataSearch.length > 0 ? (
                  subjectstDataSearch.map((subject, index) => (
                    <List.Item key={index} className="rounded-md ">
                      <List.Item.Meta
                        className="px-3"
                        title={
                          <div className="flex gap-3">
                            <div
                              onClick={() => onSelectSubjectOk(subject)}
                              className="flex cursor-pointer text-info underline hover:text-info/40"
                            >
                              {subject.subjectCode}
                            </div>
                            <div className="flex">
                              <Tag color="cyan">
                                {LocalsSwip("หมู่", "section")}{" "}
                                {subject.sectionCode}
                              </Tag>
                              <Tag color="pink">
                                {LocalsSwip("หน่วยกิต", "Credit")}{" "}
                                {subject.maxCredit}
                              </Tag>
                            </div>
                          </div>
                        }
                        description={
                          <div className="flex flex-col">
                            <div>
                              {subject.subjectNameTh} ({subject.subjectNameEn})
                            </div>
                            <div></div>
                            <div className="mt-2 flex flex-wrap">
                              {CourseDateSeparate(subject.coursedate).map(
                                (date, index2) => (
                                  <Tag key={index2}>
                                    {date.day_w} ({date.time_form}-
                                    {date.time_to})
                                  </Tag>
                                )
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap">
                              {RoomSeparate(subject.roomNameEn).map(
                                (room, index2) => (
                                  <Tag
                                    key={index2}
                                    color="green"
                                    icon={
                                      <Icon icon="material-symbols:location-on" />
                                    }
                                  >
                                    {room.room}
                                  </Tag>
                                )
                              )}
                              {subject.sectionTypeEn === "Lecture" ? (
                                <Tag
                                  color="blue"
                                  icon={<Icon icon="ph:book-fill" />}
                                >
                                  {LocalsSwip(
                                    subject.sectionTypeTh,
                                    subject.sectionTypeEn
                                  )}
                                </Tag>
                              ) : (
                                <Tag
                                  color="orange"
                                  icon={<Icon icon="ic:baseline-science" />}
                                >
                                  {LocalsSwip(
                                    subject.sectionTypeTh,
                                    subject.sectionTypeEn
                                  )}
                                </Tag>
                              )}
                              {subject.stdStatusEn === "Special" ? (
                                <Tag color="orange">
                                  {LocalsSwip(
                                    subject.stdStatusTh,
                                    subject.stdStatusEn
                                  )}
                                </Tag>
                              ) : (
                                <Tag color="blue">
                                  {LocalsSwip(
                                    subject.stdStatusTh,
                                    subject.stdStatusEn
                                  )}
                                </Tag>
                              )}
                            </div>
                            <div className="mt-2 flex overflow-x-auto">
                              {locale === "th"
                                ? subject.teacherName
                                  ? subject
                                      .teacherName!.split(",")
                                      .map((name, tid) => (
                                        <Tag key={tid}>{name}</Tag>
                                      ))
                                  : ""
                                : subject.teacherNameEn
                                ? subject
                                    .teacherNameEn!.split(",")
                                    .map((name, tid) => (
                                      <Tag key={tid}>{name}</Tag>
                                    ))
                                : ""}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  ))
                ) : (
                  <div className="my-5 flex justify-center">
                    {LocalsSwip(
                      "ไม่เปิดรายวิชาหรือไม่พบวิชาที่ค้นหา",
                      "No subject found or subject not open"
                    )}
                  </div>
                )}
              </List>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SearchSubject;
