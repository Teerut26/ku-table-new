import useLocalsSwip from "@/hooks/useLocalsSwip";
import LocaleSwip from "@/utils/localeSwip";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Table from "../Table";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocalStorage } from "usehooks-ts";
import { Icon } from "@iconify/react";
import SearchSubject from "./SearchSubject";
import { v4 as uuid } from "uuid";
import _ from "lodash";

interface FormDataAllInterface {
  time: string[];
  day: string;
  subject_type: string;
  subject_code: string;
  subject_name: string;
  room: string;
  section: string;
  section_type: string;
  teacher_name: string;
}

interface Props {
  isIPhone: boolean;
}

const CustomTimeTable: NextPage<Props> = ({ isIPhone }) => {
  const { LocalsSwip } = useLocalsSwip();
  const [form] = Form.useForm();
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom02", []);
  const [FormDataAll, setFormDataAll] = useState<FormDataAllInterface | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  const onFinish = () => {
    if (FormDataAll) {
      const time_start = dayjs(FormDataAll.time[0], "HH:mm").diff(
        dayjs("00:00", "HH:mm"),
        "minute"
      );

      const newCourse: Course = {
        subject_code: FormDataAll.subject_code,
        subject_name_en: FormDataAll.subject_name,
        subject_name_th: FormDataAll.subject_name,
        section_code: FormDataAll.section,
        section_type: FormDataAll.section_type,
        room_name_en: FormDataAll.room,
        room_name_th: FormDataAll.room,
        section_type_en: FormDataAll.section_type,
        section_type_th: FormDataAll.section_type,
        teacher_name: FormDataAll.teacher_name,
        teacher_name_en: FormDataAll.teacher_name,
        time_from: FormDataAll.time[0],
        time_to: FormDataAll.time[1],
        day_w: FormDataAll.day,
        time_start: time_start,
      } as Course;
      SetCourses((pre) => [...pre, newCourse]);
      setFormDataAll(null);
      form.resetFields();
    }
  };

  const onEdit = (course: Course) => {
    form.setFieldsValue({
      time: [dayjs(course.time_from, "HH:mm"), dayjs(course?.time_to, "HH:mm")],
      day: course.day_w,
      subject_code: course.subject_code,
      subject_name: course.subject_name_th,
      room: course.room_name_th,
      section: course.section_code,
      teacher_name: course.teacher_name,
      section_type: course.section_type_en,
    });
    setisEdit(true);
  };

  const onEditFinish = () => {
    let courseAll = Courses;

    _.remove(courseAll, {
      day_w: FormDataAll?.day,
      section_code: FormDataAll?.section,
      time_from: TimeHourCovertToSingle(FormDataAll?.time[0]!),
      time_to: TimeHourCovertToSingle(FormDataAll?.time[1]!),
    });

    if (FormDataAll) {
      const time_start = dayjs(FormDataAll.time[0], "HH:mm").diff(
        dayjs("00:00", "HH:mm"),
        "minute"
      );

      const newCourse: Course = {
        subject_code: FormDataAll.subject_code,
        subject_name_en: FormDataAll.subject_name,
        subject_name_th: FormDataAll.subject_name,
        section_code: FormDataAll.section,
        section_type: FormDataAll.section_type,
        room_name_en: FormDataAll.room,
        room_name_th: FormDataAll.room,
        section_type_en: FormDataAll.section_type,
        section_type_th: FormDataAll.section_type,
        teacher_name: FormDataAll.teacher_name,
        teacher_name_en: FormDataAll.teacher_name,
        time_from: TimeHourCovertToSingle(FormDataAll.time[0]!),
        time_to: TimeHourCovertToSingle(FormDataAll.time[1]!),
        day_w: FormDataAll.day,
        time_start: time_start,
      } as Course;
      SetCourses([...courseAll, newCourse]);
      setFormDataAll(null);
      form.resetFields();
      setisEdit(false);
    }
  };

  const CourseSorting = (courses: Course[]) => {
    const sortedItems = _.orderBy(courses, ["time_start"], "asc");
    return sortedItems;
  };
  const TimeHourCovertToSingle = (time: string) => {
    const hour = parseInt(time.split(":")[0]!);
    const minute = parseInt(time.split(":")[1]!);
    const timeString = `${hour}:${minute === 0 ? "00" : "30"}`;
    return timeString;
  };

  return (
    <>
      <SearchSubject
        onIsModalOpen={(v) => setIsModalOpen(v)}
        isModalOpen={isModalOpen}
        onSelect={(v) => SetCourses((pre) => [...pre, ...v])}
      />
      <div className="flex flex-col gap-3">
        <Card>
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            onValuesChange={(changedValues, allValues) => {
              setFormDataAll((pre) => ({
                ...pre!,
                ...allValues,
                time: [
                  String(allValues.time?.[0]?.format("HH:mm")),
                  String(allValues.time?.[1]?.format("HH:mm")),
                ],
              }));
            }}
          >
            <div className="flex w-full flex-col md:flex-row md:gap-2">
              <Form.Item
                label={LocalsSwip("เลือกเวลา", "Select Time")}
                name="time"
                className="w-full"
                rules={[{required: true}]}
              >
                <TimePicker.RangePicker
                  className="w-full"
                  size="large"
                  showSecond={false}
                  format="HH:mm"
                  minuteStep={30}
                />
              </Form.Item>
              <Form.Item
                label={LocalsSwip("เลือกวัน", "Select Day")}
                name="day"
                className="w-full"
                rules={[{required: true}]}
              >
                <Select
                  size="large"
                  placeholder={LocalsSwip("เลือกวัน", "Select Day")}
                >
                  <Select.Option value="MON">
                    {LocalsSwip("จันทร์", "Monday")}
                  </Select.Option>
                  <Select.Option value="TUE">
                    {LocalsSwip("อังคาร", "Tuesday")}
                  </Select.Option>
                  <Select.Option value="WED">
                    {LocalsSwip("พุธ", "Wednesday")}
                  </Select.Option>
                  <Select.Option value="THU">
                    {LocalsSwip("พฤหัสบดี", "Thursday")}
                  </Select.Option>
                  <Select.Option value="FRI">
                    {LocalsSwip("ศุกร์", "Friday")}
                  </Select.Option>
                  <Select.Option value="SAT">
                    {LocalsSwip("เสาร์", "Saturday")}
                  </Select.Option>
                  <Select.Option value="SUN">
                    {LocalsSwip("อาทิตย์", "Sunday")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex w-full flex-col md:flex-row md:gap-2">
              <Form.Item
                label={
                  <div className="flex items-center gap-1">
                    {LocalsSwip("รหัสวิชา", "Subject Code")}
                    <Icon
                      icon="material-symbols:content-paste-search"
                      className="cursor-pointer text-base hover:text-primary"
                      onClick={() => {
                        console.log("click");

                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                }
                name="subject_code"
                className="w-full"
                rules={[{required: true}]}
              >
                <Input size="large" placeholder="01417111-65" />
              </Form.Item>
              <Form.Item
                label={LocalsSwip("ชื่อวิชา", "Subject Name")}
                name="subject_name"
                className="w-full"
                rules={[{required: true}]}
              >
                <Input
                  size="large"
                  placeholder={LocalsSwip("แคลคูลัส I", "Calculus I")}
                />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-2">
              <Form.Item
                label={LocalsSwip("ห้อง", "Room")}
                name="room"
                className="w-full"
                rules={[{required: true}]}
              >
                <Input size="large" placeholder="SC45-709" />
              </Form.Item>
              <Form.Item
                label={LocalsSwip("หมู่เรียน", "Section")}
                name="section"
                className="w-full"
                rules={[{required: true}]}
              >
                <Input size="large" placeholder="1" />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-2">
              <Form.Item
                label={LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
                name="section_type"
                className="w-full"
                rules={[{required: true}]}
              >
                <Select
                  size="large"
                  placeholder={LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
                >
                  <Select.Option value="Lecture">Lecture</Select.Option>
                  <Select.Option value="Lab">Lab</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={LocalsSwip("ชื่ออาจารย์ผู้สอน", "Teacher Name")}
                name="teacher_name"
                className="w-full"
                rules={[{required: true}]}
              >
                <Input size="large" />
              </Form.Item>
            </div>
            {!isEdit ? (
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full"
              >
                {LocalsSwip("เพิ่ม", "Add")}
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={onEditFinish}
              >
                {LocalsSwip("แก้ไข", "Edit")}
              </Button>
            )}
          </Form>
        </Card>
        {Courses.length !== 0 ? (
          <Table
            isIPhone={isIPhone}
            courseData={CourseSorting(Courses)}
            canRemove={true}
            onRemove={(course) => {
              SetCourses((pre) => {
                let courseAll = pre;
                _.remove(courseAll, {
                  day_w: course.day_w,
                  section_code: course.section_code,
                  time_from: course.time_from,
                  time_to: course.time_to,
                });

                return courseAll;
              });
            }}
            canEdit={true}
            onEdit={onEdit}
          />
        ) : (
          <div className="flex justify-center p-5 border-[1px] border-base-content">
            {LocalsSwip("คุณยังไม่มีจัดตารางเรียน", "You don't have timetable")}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomTimeTable;
