import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import useCartSubjectStore from "@/stores/useCartSubjectStore";
import useTapStore from "@/stores/useTabStore";
import calculateCredits from "@/utils/calculateCredits";
import courseFindUnique from "@/utils/courseFindUnique";
import { Icon } from "@iconify/react";
import { Badge } from "@mui/material";
import { Button, Modal } from "antd";
import { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";

interface Props {}

const Cart: NextPage<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courses, removeCourse, clearCourse } = useCartSubjectStore((r) => r);
  const [Courses, setCourses] = useLocalStorage<Course[]>("CourseCustom04", []);
  const { setTab } = useTapStore((s) => s);
  const { LocalsSwip } = useLocalsSwip();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (courses.length === 0) {
      toast.error(LocalsSwip("กรุณาเลือกวิชา", "Please select subject"));
      return;
    }
    setCourses((pre) => [...pre, ...courses]);
    setTab("tab3");
    toast.success(LocalsSwip("เพิ่มวิชาเรียบร้อย", "Add subject successfully"));
    setIsModalOpen(false);
    clearCourse();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Badge badgeContent={courseFindUnique(courses).length} color="primary">
        <button onClick={showModal} className="btn btn-outline btn-primary btn-sm items-center gap-2">
          <Icon icon="material-symbols:shopping-cart-rounded" className="text-lg" />
          {LocalsSwip("วิชาที่เลือก", "Selected Subjects")}
        </button>
      </Badge>
      <Modal
        title={
          <>
            <div className="flex justify-between">
              {LocalsSwip("วิชาที่เลือก", "Selected Subjects")}
              <div className="pr-5">{LocalsSwip(`รวม ${calculateCredits(courses)} หน่วยกิต`, `Total ${calculateCredits(courses)} credits`)}</div>
            </div>
          </>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="flex justify-end gap-2" key={1}>
            <button className="btn btn-outline btn-primary btn-sm items-center gap-2">{LocalsSwip("ยกเลิก", "Cancel")}</button>
            <button className="btn btn-primary btn-sm items-center gap-2" onClick={handleOk}>
              {LocalsSwip("เพิ่มวิชา", "Add Subjects")}
            </button>
          </div>,
        ]}
      >
        <div className="my-5 flex flex-col gap-2">
          {courseFindUnique(courses).map((course, id) => (
            <div key={id} className="flex items-center justify-between gap-5">
              <div>{course.subject_code}</div>
              <div className="grow">{LocalsSwip(course.subject_name_th, course.subject_name_en)}</div>
              <div>{LocalsSwip(`${course.max_credit} หน่วยกิต`, `${course.max_credit} Credits`)}</div>
              <Button size="small" danger onClick={() => removeCourse(course)}>
                {LocalsSwip("ลบ", "Delete")}
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Cart;
