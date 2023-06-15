import { BaseApiStructure, BaseApiStructureSubjectsSearch } from "@/interfaces/BaseApiStructure";
import { SearchSubjectOpenEnrResponseInterface } from "@/interfaces/SearchSubjectOpenEnrResponseInterface";
import axios from "axios";
import CORSProxy from "./CORSProxy";

interface Props {
  query: string;
  token: string;
}

const getSubjectSearchService = async (props: Props) => {
  return axios<BaseApiStructureSubjectsSearch<SearchSubjectOpenEnrResponseInterface[]>>({
    method: "get",
    url: CORSProxy(`https://myapi.ku.th/enroll/searchSubjectOpenEnr?query=${props.query}`),
    headers: {
      "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
      "x-access-token": props.token,
    },
  });
};

export default getSubjectSearchService;
