import { env } from "@/env/server.mjs";
import axios from "axios";
import FormData from "form-data";

interface Props {
  message: string;
}

const sendReport = async (props: Props) => {
  let data = new FormData();
  data.append("message", props.message);

  return axios({
    method: "post",
    maxBodyLength: Infinity,
    url: "https://notify-api.line.me/api/notify",
    headers: {
      Authorization: `Bearer ${env.TOKEN_LINE}`,
    },
    data: data,
  });
};

export default sendReport;
