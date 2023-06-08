import useLocalsSwip from "@/hooks/useLocalsSwip";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import { NextPage } from "next";
import Table from "../Table";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useLocalStorage } from "usehooks-ts";
import { Icon } from "@iconify/react";
import SearchSubject from "./SearchSubject";
import _ from "lodash";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

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
  uuid: string;
  max_credit: number;
}

interface Props {
  isIPhone: boolean;
}

const CustomTimeTable: NextPage<Props> = ({ isIPhone }) => {
  const { LocalsSwip } = useLocalsSwip();
  const [form] = Form.useForm();
  const [Courses, SetCourses] = useLocalStorage<Course[]>("CourseCustom04", []);
  const [FormDataAll, setFormDataAll] = useState<FormDataAllInterface | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setisEdit(true);
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
        time_from: TimeHourCovertToSingle(FormDataAll.time[0]!),
        time_to: TimeHourCovertToSingle(FormDataAll.time[1]!),
        day_w: FormDataAll.day,
        time_start: time_start,
        uuid: FormDataAll.uuid,
        max_credit: FormDataAll.max_credit,
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
            onRemove={(course) =>
              SetCourses((pre) => pre.filter((c) => c.uuid !== course.uuid))
            }
            hasShare={true}
            canEdit={true}
            onEdit={onEdit}
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
                  <Icon icon="tabler:table-import" className="text-lg" /> Export
                </div>
                <div
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                  className="btn-outline btn-primary btn-sm btn gap-2 uppercase"
                >
                  <Icon icon="tabler:table-export" className="text-lg" /> Import
                </div>
                <div className="flex justify-end md:mr-3 md:grow">
                  <div className="stats btn-primary">
                    <div className="stat">
                      <div className="stat-title ">
                        {LocalsSwip("หน่วยกิตรวม", "Total Credit")}
                      </div>
                      <div className="stat-value">
                        {_.sumBy(
                          _.uniqBy(
                            Courses,
                            (x) => x.subject_code + x.max_credit
                          ),
                          (x) => x.max_credit!
                        )}
                      </div>
                    </div>
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
                  <Icon icon="tabler:table-export" className="text-lg" /> Import
                </div>
              </>
            </div>
            {LocalsSwip("คุณยังไม่มีจัดตารางเรียน", "You don't have timetable")}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomTimeTable;
