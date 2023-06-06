import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import { SearchSubjectOpenEnrResponseInterface } from "@/interfaces/SearchSubjectOpenEnrResponseInterface";
import { api } from "@/utils/api";
import LocaleSwip from "@/utils/localeSwip";
import { Avatar, Input, List, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { NextPage } from "next";
import { use, useEffect, useState } from "react";

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
  const [SeleteSubject, setSeleteSubject] = useState<
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
    setSeleteSubject(subject);
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
          teacher_name_en: subject.teacherName,
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
    console.log(newCourse);

    onSelect(newCourse);
    onIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={LocalsSwip("ค้นหาวิชา", "Search Subject")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-2">
          <Input
            onChange={(e) => {
              if (e.target.value === "") {
                setSeleteSubject(undefined);
                subjectSearchtApi.reset();
              }
              setKeyword(e.target.value);
              setSeleteSubject(undefined);
            }}
            size="large"
            placeholder="รหัสวิชา, ชื่อวิชา"
          />
          {!SeleteSubject ? (
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
              {subjectstApi.data &&
                subjectstApi.data?.results.map((subject, index) => (
                  <List.Item
                    key={index}
                    onClick={() => onSelectSubjectOk(subject)}
                    className="cursor-pointer rounded-md hover:bg-base-200"
                  >
                    <List.Item.Meta
                      className="px-3"
                      title={
                        <div className="flex">
                          {subject.subjectCode} ({subject.sectionCode})
                        </div>
                      }
                      description={
                        <div className="flex flex-col">
                          <div>
                            {subject.subjectNameTh} ({subject.subjectNameEn})
                          </div>
                          <div></div>
                          <div className="mt-2 flex">
                            {CourseDateSeparate(subject.coursedate).map(
                              (date,index2) => (
                                <Tag color="purple" key={index2}>
                                  {date.day_w} ({date.time_form}-{date.time_to})
                                </Tag>
                              )
                            )}
                          </div>
                          <div className="mt-2 flex">
                            {RoomSeparate(subject.roomNameEn).map((room,index2) => (
                              <Tag key={index2} color="green">{room.room}</Tag>
                            ))}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                ))}
            </List>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SearchSubject;