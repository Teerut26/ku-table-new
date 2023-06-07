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
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const showModal = () => {
    onIsModalOpen(true);
  };

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
            <List loading={subjectstApi.isLoading}>
              {subjectstApi.data && subjectstApi.data.results.length > 0 ? (
                subjectstApi.data?.results.map((subject, index) => (
                  <List.Item
                    key={index}
                    onClick={() => onSelectSubjectOk(subject)}
                    className="cursor-pointer rounded-md hover:bg-base-200"
                  >
                    <List.Item.Meta
                      className="px-3"
                      title={
                        <div className="flex gap-3">
                          <div className="flex">{subject.subjectCode}</div>
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
                                  {date.day_w} ({date.time_form}-{date.time_to})
                                </Tag>
                              )
                            )}
                          </div>
                          <div className="mt-2 flex">
                            {RoomSeparate(subject.roomNameEn).map(
                              (room, index2) => (
                                <Tag key={index2} color="green">
                                  {room.room}
                                </Tag>
                              )
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
                        </div>
                      }
                    />
                  </List.Item>
                ))
              ) : (
                <div className="flex justify-center">
                  {LocalsSwip(
                    "ไม่เปิดรายวิชาหรือไม่พบวิชาที่ค้นหา",
                    "No subject found or subject not open"
                  )}
                </div>
              )}
            </List>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SearchSubject;
