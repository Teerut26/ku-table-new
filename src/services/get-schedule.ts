import { BaseApiStructure } from "@/interfaces/BaseApiStructure";
import { ScheduleResponseInterface } from "@/interfaces/ScheduleResponseInterface";
import axios from "axios";

interface Props {
  stdStatusCode: string;
  campusCode: string;
  facultyCode: string;
  majorCode: string;
  userType: string;
  token: string;
}

const getSchedule = async (props: Props) => {
  return axios<BaseApiStructure<ScheduleResponseInterface[]>>({
    method: "get",
    url: `https://myapi.ku.th/common/getschedule?stdStatusCode=17001&campusCode=B&facultyCode=D&majorCode=D14&userType=1`,
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getSchedule;
