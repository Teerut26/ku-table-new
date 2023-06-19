import { Course } from "@/interfaces/GroupCourseResponseInterface";
import db from "@/configs/firestoreAdmin";
import CryptoJS from "crypto-js";

interface Props {
  course: Course[];
  stdId: string;
}

const syncCourse = async (props: Props) => {
  const hashStdId = CryptoJS.SHA256(props.stdId).toString(CryptoJS.enc.Hex);
  const linksRef = db.collection("sync").doc(hashStdId);
  linksRef.set({
    hashStdId,
    courseData: props.course,
  });
};

const getSyncCourse = async (stdId: string) => {
  const hashStdId = CryptoJS.SHA256(stdId).toString(CryptoJS.enc.Hex);
  const linksRef = db.collection("sync").doc(hashStdId);
  const data = await linksRef.get();
  return data.data()?.courseData as Course[];
};

export { syncCourse, getSyncCourse };
