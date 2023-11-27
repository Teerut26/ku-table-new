import { BaseApiStructure } from "@/interfaces/BaseApiStructure";
import axios from "axios";
import CORSProxy from "./CORSProxy";
import { CheckGradesInterface } from "@/interfaces/CheckGradesInterface";

interface Props {
  token: string;
}

const getGrades = async (props: Props) => {
  return axios<BaseApiStructure<CheckGradesInterface[]>>({
    method: "get",
    url: CORSProxy(`https://myapi.ku.th/std-profile/checkGrades`),
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getGrades;
