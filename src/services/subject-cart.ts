import { Course } from "@/interfaces/GroupCourseResponseInterface";
import db from "@/configs/firestoreAdmin";

interface Props {
  course: Course[];
  stdId: string;
}

const setCart = async (props: Props) => {
  const hashStdId = CryptoJS.SHA256(props.stdId).toString(CryptoJS.enc.Hex);
  const linksRef = db.collection("cart").doc(hashStdId);
  linksRef.set({
    hashStdId,
    courseData: props.course,
  });
};

const getCart = async (stdId: string) => {
  const hashStdId = CryptoJS.SHA256(stdId).toString(CryptoJS.enc.Hex);
  const linksRef = db.collection("cart").doc(hashStdId);
  const data = await linksRef.get();
  return data.data()?.courseData as Course[];
};

export { setCart, getCart };
