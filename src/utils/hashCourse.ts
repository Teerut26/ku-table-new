import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import C from "crypto-js";
const sha256 = (data: OpenSubjectForEnrollInterface) => {
  return C.SHA256(data.coursedate+data.subjectCode+data.maxCredit+data.roomNameEn+data.property).toString(C.enc.Hex);
};

const checkCanAdd = (data: OpenSubjectForEnrollInterface) => {
    if (!data.coursedate || !data.subjectCode || !data.maxCredit || !data.roomNameEn || !data.property) {
        return false;
    }
    return true;
}

export {
    sha256,
    checkCanAdd
}