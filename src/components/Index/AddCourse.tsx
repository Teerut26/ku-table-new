import useLocalsSwip from "@/hooks/useLocalsSwip";
import { FormDataAllInterface } from "@/interfaces/FormDataAllInterface";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
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
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";

interface Props {}

const AddCourse: NextPage<Props> = () => {
  const [FormDataAll, setFormDataAll] = useState<FormDataAllInterface | null>();
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom04", []);
  const [OpenModal, setOpenModal] = useState(false)
  const { LocalsSwip } = useLocalsSwip();
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

  return (
    <>
      <button onClick={()=>setOpenModal(true)} className="btn-outline btn-primary btn-sm btn gap-2">
        <Icon icon="mdi:plus" className="text-lg" />
        {LocalsSwip("เพิ่มวิชา", "Add Course")}
      </button>
      <Modal open={OpenModal} footer={[]} onCancel={()=>setOpenModal(false)}>
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
              {LocalsSwip("เพิ่ม", "Add")}
            </Button>
          </Form>
      </Modal>
    </>
  );
};

export default AddCourse;
