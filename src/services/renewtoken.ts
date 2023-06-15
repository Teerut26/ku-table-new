import { BaseApiStructure } from "@/interfaces/BaseApiStructure";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import { RenewTokenResponseInterface } from "@/interfaces/RenewTokenResponseInterface";
import axios from "axios";
import CORSProxy from "./CORSProxy";

interface Props {
  renewtoken: string;
}

const getRenewToken = async (props: Props) => {
  return axios<RenewTokenResponseInterface>({
    method: "post",
    url: CORSProxy(`https://myapi.ku.th/auth/renew`),
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.renewtoken,
    },
    data: {
      renewtoken: props.renewtoken,
    },
  });
};

export default getRenewToken;
