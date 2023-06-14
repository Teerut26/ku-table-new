import useLocalsSwip from "@/hooks/useLocalsSwip";
import { FormDataAllInterface } from "@/interfaces/FormDataAllInterface";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import timeHourCovertToSingle from "@/utils/timeHourCovertToSingle";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import _ from "lodash";

interface Props {
  course: Course;
}

const EditCourse: NextPage<Props> = ({ course }) => {
  const { LocalsSwip } = useLocalsSwip();
  const [FormDataAll, setFormDataAll] = useState<FormDataAllInterface | null>();
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom04", []);
  const [OpenModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();

  const onFinish = () => {
    if (FormDataAll) {
      const time_start = dayjs(FormDataAll.time[0], "HH:mm").diff(
        dayjs("00:00", "HH:mm"),
        "minute"
      );

      const newCourse: Course = {
        uuid: uuid(),
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
        max_credit: FormDataAll.max_credit,
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
      max_credit: course.max_credit,
    });
    setFormDataAll({
      uuid: course.uuid as string,
    } as any);
    setOpenModal(true);
  };

  const onEditFinish = () => {
    let courseAll = Courses;

    let removeData = _.remove(courseAll, {
      uuid: FormDataAll?.uuid,
    });

    if (removeData.length === 0) {
      return toast.error("ไม่พบวิชาที่ต้องการแก้ไข");
    }

    if (FormDataAll) {
      const time_start = dayjs(FormDataAll.time[0], "HH:mm").diff(
        dayjs("00:00", "HH:mm"),
        "minute"
      );

      const newCourse: Course = {
        subject_code: FormDataAll.subject_code,
        subject_name_en: removeData[0]?.subject_name_en
          ? removeData[0]?.subject_name_en
          : FormDataAll.subject_name,
        subject_name_th: FormDataAll.subject_name,
        section_code: FormDataAll.section,
        section_type: FormDataAll.section_type,
        room_name_en: removeData[0]?.room_name_en
          ? removeData[0]?.room_name_en
          : FormDataAll.room,
        room_name_th: FormDataAll.room,
        section_type_en: FormDataAll.section_type,
        section_type_th: FormDataAll.section_type,
        teacher_name: FormDataAll.teacher_name,
        teacher_name_en: removeData[0]?.teacher_name_en
          ? removeData[0]?.teacher_name_en
          : FormDataAll.teacher_name,
        time_from: timeHourCovertToSingle(FormDataAll.time[0]!),
        time_to: timeHourCovertToSingle(FormDataAll.time[1]!),
        day_w: FormDataAll.day,
        time_start: time_start,
        uuid: FormDataAll.uuid,
        max_credit: FormDataAll.max_credit,
      } as Course;
      SetCourses([...courseAll, newCourse]);
      setFormDataAll(null);
      form.resetFields();
      setOpenModal(false);
    }
  };

  return (
    <>
      <Button className="w-fit" onClick={() => onEdit(course)}>
        {LocalsSwip("แก้ไข", "Edit")}
      </Button>
      <Modal open={OpenModal} footer={[]} onCancel={() => setOpenModal(false)}>
        <Form
          onFinish={onEditFinish}
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
              rules={[{ required: true }]}
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
              rules={[{ required: true }]}
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
                </div>
              }
              name="subject_code"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="01417111-65" />
            </Form.Item>
            <Form.Item
              label={LocalsSwip("ชื่อวิชา", "Subject Name")}
              name="subject_name"
              className="w-full"
              rules={[{ required: true }]}
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
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="SC45-709" />
            </Form.Item>
            <Form.Item
              label={LocalsSwip("หมู่เรียน", "Section")}
              name="section"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="1" />
            </Form.Item>
            <Form.Item
              label={LocalsSwip("หน่วยกิต", "Credit")}
              name="max_credit"
              className="w-full"
              rules={[{ required: true }]}
            >
              <InputNumber size="large" className="w-full" />
            </Form.Item>
          </div>
          <div className="flex w-full flex-col md:flex-row md:gap-2">
            <Form.Item
              label={LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
              name="section_type"
              className="w-full"
              rules={[{ required: true }]}
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
              rules={[{ required: true }]}
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
            {LocalsSwip("แก้ไข", "Edit")}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EditCourse;
