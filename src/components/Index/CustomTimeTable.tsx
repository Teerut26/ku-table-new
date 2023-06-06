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
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom", []);
  const [FormDataAll, setFormDataAll] =
    useLocalStorage<FormDataAllInterface | null>("FormDataAll", null);

  const onFinish = () => {
    if (FormDataAll) {
      const time_start = dayjs(FormDataAll.time[0]).diff(
        dayjs("00:00", "HH:mm"),
        "minute"
      );
      const newCourse: Course = {
        subject_code: FormDataAll.subject_code,
        subject_name_en: FormDataAll.subject_name,
        subject_name_th: FormDataAll.subject_name,
        section_code: FormDataAll.section,
        room_name_en: FormDataAll.room,
        room_name_th: FormDataAll.room,
        section_type_en: FormDataAll.subject_type,
        section_type_th: FormDataAll.subject_type,
        teacher_name: FormDataAll.teacher_name,
        teacher_name_en: FormDataAll.teacher_name,
        teacher_name_th: FormDataAll.teacher_name,
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
    // setFormData((pre) => ({
    //   time: [course.time_from!, course.time_to!],
    //   time_start: course.time_start!,
    //   day: course.day_w!,
    //   subject_type: course.section_type_en!,
    // }));
    // form.setFieldsValue({
    //   subject_code: course.subject_code,
    //   subject_name: course.subject_name_en,
    //   section: course.section_code,
    //   room: course.room_name_en,
    //   teacher_name: course.teacher_name_en,
    // });
    // setKeyForm((pre) => pre + 1);
  };

  useEffect(() => {
    if (FormDataAll !== null) {
      form.setFieldsValue({
        ...FormDataAll,
        time: [
          dayjs(FormDataAll?.time[0], "HH:mm"),
          dayjs(FormDataAll?.time[1], "HH:mm"),
        ],
      });
    }
  }, []);

  return (
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
              label={LocalsSwip("เลือกเวลา", "Selete Time")}
              name="time"
              className="w-full"
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
              label={LocalsSwip("เลือกวัน", "Selete Day")}
              name="day"
              className="w-full"
            >
              <Select
                size="large"
                placeholder={LocalsSwip("เลือกวัน", "Selete Day")}
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
              label={LocalsSwip("รหัสวิชา", "Subject Code")}
              name="subject_code"
              className="w-full"
            >
              <Input size="large" placeholder="01417111-65" />
            </Form.Item>
            <Form.Item
              label={LocalsSwip("ชื่อวิชา", "Subject Name")}
              name="subject_name"
              className="w-full"
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
            >
              <Input size="large" placeholder="SC45-709" />
            </Form.Item>
            <Form.Item
              label={LocalsSwip("หมู่เรียน", "Section")}
              name="section"
              className="w-full"
            >
              <Input size="large" placeholder="1" />
            </Form.Item>
          </div>
          <div className="flex w-full flex-col md:flex-row md:gap-2">
            <Form.Item
              label={LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
              name="section_type"
              className="w-full"
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
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
          >
            {LocalsSwip("เพิ่ม", "Add")}
          </Button>
        </Form>
      </Card>
      <Table
        isIPhone={isIPhone}
        hasShare={true}
        courseData={Courses}
        canRemove={true}
        onRemove={(course) => {
          SetCourses((pre) =>
            pre.filter(
              (c) =>
                c.time_from !== course.time_from &&
                c.time_to !== course.time_to &&
                c.day_w !== course.day_w &&
                c.section_code !== course.section_code
            )
          );
        }}
        canEdit={true}
        onEdit={onEdit}
      />
    </div>
  );
};

export default CustomTimeTable;
