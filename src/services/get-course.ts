import { GroupCourseResponseInterface } from "@/interfaces/GroupCourseResponseInterface";
import axios from "axios";

interface Props {
  academicYear: string;
  semester: string;
  stdId: string;
  token: string;
}

const getGroupCourseService = async (props: Props) => {
  return axios<GroupCourseResponseInterface>({
    method: "get",
    url: `https://myapi.ku.th/std-profile/getGroupCourse?academicYear=2565&semester=2&stdId=${props.stdId}`,
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getGroupCourseService;
