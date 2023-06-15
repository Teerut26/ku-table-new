import { BaseApiStructure } from "@/interfaces/BaseApiStructure";
import { ScheduleResponseInterface } from "@/interfaces/ScheduleResponseInterface";
import axios from "axios";
import CORSProxy from "./CORSProxy";

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
    url: CORSProxy(`https://myapi.ku.th/common/getschedule?stdStatusCode=${props.stdStatusCode}&campusCode=${props.campusCode}&facultyCode=${props.facultyCode}&majorCode=${props.majorCode}&userType=${props.userType}`),
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getSchedule;
