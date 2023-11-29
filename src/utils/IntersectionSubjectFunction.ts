import { intersectionType } from "@/interfaces/intersectionType";

const IntersectionSubjectFunction = (a: intersectionType, b: intersectionType) => a.subjectCode.slice(0, 8) === b.subjectCode.slice(0, 8);

export default IntersectionSubjectFunction;
