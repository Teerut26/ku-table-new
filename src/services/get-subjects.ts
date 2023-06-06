import { BaseApiStructure } from "@/interfaces/BaseApiStructure";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import axios from "axios";

interface Props {
  query: string;
  academicYear: number;
  semester: number;
  campusCode: string;
  token: string;
}

const getSubjects = async (props: Props) => {
  return axios<BaseApiStructure<OpenSubjectForEnrollInterface[]>>({
    method: "get",
    url: `https://myapi.ku.th/enroll/openSubjectForEnroll?query=${props.query}&academicYear=${props.academicYear}&semester=${props.semester}&campusCode=${props.campusCode}&section=`,
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getSubjects;
