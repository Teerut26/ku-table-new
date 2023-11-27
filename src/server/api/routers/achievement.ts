import { createTRPCRouter, protectedProcedure } from "../trpc";
import getGrades from "@/services/get-grades";
import { SubjectGroupEnum, SubjectGroupGenEdEnum } from "@/interfaces/SubjectGroupEnum";

import UnitRequireRaw from "@/assets/unitRequire.json";

import GenEdAll from "@/assets/genEd/All.json";

import _ from "lodash";
import findCourseYear from "@/utils/findCourseYear";

interface intersectionType {
  subjectCode: string;
  subjectName: string;
  subjectCredits: number;
}

export const achievementRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ input, ctx }) => {
    try {
      const result = await getGrades({
        token: ctx.session.user.email?.accesstoken!,
      });

      const majorCode = ctx.session.user.email?.user.student.majorCode.trim()!;
      const facultyNameTh = ctx.session.user.email?.user.student.facultyNameTh.trim()!;
      const idCode = ctx.session.user.email?.user.idCode.slice(0, 2).trim();

      const courseYear = findCourseYear(idCode!);

      if (
        (UnitRequireRaw as any)[majorCode] === undefined ||
        (UnitRequireRaw as any)[majorCode][courseYear] === undefined
      ) {
        return [];
      }

      const unitRequire = (UnitRequireRaw as any)[majorCode][courseYear];

      const genEdCreditRequire =
        unitRequire.Aesthetics +
        unitRequire.Language_and_Communication +
        unitRequire.Thai_Citizen_and_Global_Citizen +
        unitRequire.Entrepreneurship +
        unitRequire.Wellness +
        unitRequire.Faculty;

      let gradeAll: intersectionType[] = [];
      result.data.results.map((grade) =>
        grade.grade.map((grade) => {
          const gradeSet = ["A", "B", "B+", "C+", "C", "D+", "D"];

          if (!gradeSet.includes(grade.grade)) {
            return;
          }

          gradeAll.push({
            subjectCode: grade.subject_code,
            subjectName: grade.subject_name_en,
            subjectCredits: grade.credit,
          });
        })
      );

      const IntersectionFunction = (a: intersectionType, b: intersectionType) =>
        a.subjectCode.slice(0, 8) === b.subjectCode.slice(0, 8);

      const DataCastingFunction = (subject: any) => {
        return {
          subjectCode: subject.subjectCode,
          subjectName: subject.subjectName,
          subjectCredits: parseInt(subject.subjectCredits),
        };
      };

      const FacultyRaw = GenEdAll.filter((v) => v.subjectFaculty.match(facultyNameTh));

      const WellnessRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระอยู่ดีมีสุข"));
      const AestheticsRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระสุนทรียศาสตร์"));
      const EntrepreneurshipRaw = GenEdAll.filter((v) =>
        v.subjectGroup.match("กลุ่มสาระศาสตร์แห่งผู้ประกอบการ")
      );
      const Thai_Citizen_and_Global_CitizenRaw = GenEdAll.filter((v) =>
        v.subjectGroup.match("กลุ่มสาระพลเมืองไทยและพลเมืองโลก")
      );
      const Language_and_CommunicationRaw = GenEdAll.filter((v) =>
        v.subjectGroup.match("กลุ่มสาระภาษากับการสื่อสาร")
      );

      const Wellness: intersectionType[] = WellnessRaw.map(DataCastingFunction);
      const Aesthetics: intersectionType[] = AestheticsRaw.map(DataCastingFunction);
      const Entrepreneurship: intersectionType[] = EntrepreneurshipRaw.map(DataCastingFunction);
      const Thai_Citizen_and_Global_Citizen: intersectionType[] =
        Thai_Citizen_and_Global_CitizenRaw.map(DataCastingFunction);
      const Language_and_Communication: intersectionType[] =
        Language_and_CommunicationRaw.map(DataCastingFunction);
      const Faculty: intersectionType[] = FacultyRaw.map(DataCastingFunction);

      const WellnessIntersect = _.intersectionWith(gradeAll, Wellness, IntersectionFunction);
      const AestheticsIntersect = _.intersectionWith(gradeAll, Aesthetics, IntersectionFunction);
      const EntrepreneurshipIntersect = _.intersectionWith(
        gradeAll,
        Entrepreneurship,
        IntersectionFunction
      );
      const Thai_Citizen_and_Global_CitizenIntersect = _.intersectionWith(
        gradeAll,
        Thai_Citizen_and_Global_Citizen,
        IntersectionFunction
      );
      const Language_and_CommunicationIntersect = _.intersectionWith(
        gradeAll,
        Language_and_Communication,
        IntersectionFunction
      );
      const FacultyIntersect = _.intersectionWith(gradeAll, Faculty, IntersectionFunction);

      const sumToMax = (value: number, max: number) => {
        return value > max ? max : value;
      };

      const sGEF = (v: intersectionType) => v.subjectCredits;

      const sumGeneral_EducationAll =
        sumToMax(_.sumBy(WellnessIntersect, sGEF), unitRequire.Wellness) +
        sumToMax(_.sumBy(AestheticsIntersect, sGEF), unitRequire.Aesthetics) +
        sumToMax(_.sumBy(EntrepreneurshipIntersect, sGEF), unitRequire.Entrepreneurship) +
        sumToMax(
          _.sumBy(Thai_Citizen_and_Global_CitizenIntersect, sGEF),
          unitRequire.Thai_Citizen_and_Global_Citizen
        ) +
        sumToMax(
          _.sumBy(Language_and_CommunicationIntersect, sGEF),
          unitRequire.Language_and_Communication
        ) +
        sumToMax(_.sumBy(FacultyIntersect, sGEF), unitRequire.Faculty);

      return [
        {
          type: SubjectGroupEnum.General_Education,
          credit_require: genEdCreditRequire,
          credit_current: sumGeneral_EducationAll,
          children: [
            {
              type: SubjectGroupGenEdEnum.Wellness,
              credit_require: unitRequire.Wellness,
              credit_current: _.sumBy(WellnessIntersect, (v) => v.subjectCredits),
              children: WellnessIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Aesthetics,
              credit_require: unitRequire.Aesthetics,
              credit_current: _.sumBy(AestheticsIntersect, (v) => v.subjectCredits),
              children: AestheticsIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Entrepreneurship,
              credit_require: unitRequire.Entrepreneurship,
              credit_current: _.sumBy(EntrepreneurshipIntersect, (v) => v.subjectCredits),
              children: EntrepreneurshipIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Thai_Citizen_and_Global_Citizen,
              credit_require: unitRequire.Thai_Citizen_and_Global_Citizen,
              credit_current: _.sumBy(
                Thai_Citizen_and_Global_CitizenIntersect,
                (v) => v.subjectCredits
              ),
              children: Thai_Citizen_and_Global_CitizenIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Language_and_Communication,
              credit_require: unitRequire.Language_and_Communication,
              credit_current: _.sumBy(Language_and_CommunicationIntersect, (v) => v.subjectCredits),
              children: Language_and_CommunicationIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Faculty,
              credit_require: unitRequire.Faculty,
              credit_current: _.sumBy(FacultyIntersect, (v) => v.subjectCredits),
              children: FacultyIntersect,
            },
          ],
        },
      ];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }),
});
