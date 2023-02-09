import { BaseApiStructure } from "@/interfaces/BaseApiStructure";
import { GroupCourseResponseInterface } from "@/interfaces/GroupCourseResponseInterface";
import axios from "axios";

interface Props {
  academicYear: number;
  semester: number;
  stdId: string;
  token: string;
}

const getGroupCourseService = async (props: Props) => {
  return axios<BaseApiStructure<GroupCourseResponseInterface[]>>({
    method: "get",
    url: `https://myapi.ku.th/std-profile/getGroupCourse?academicYear=${props.academicYear}&semester=${props.semester}&stdId=${props.stdId}`,
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getGroupCourseService;
