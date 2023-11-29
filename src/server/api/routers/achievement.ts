import { createTRPCRouter, protectedProcedure } from "../trpc";
import getGrades from "@/services/get-grades";
import { SubjectGroupEnum, SubjectGroupGenEdEnum } from "@/interfaces/SubjectGroupEnum";

import UnitRequireRaw from "@/assets/unitRequire.json";

import GenEdAll from "@/assets/genEd/All.json";

import _, { sum } from "lodash";
import findCourseYear from "@/utils/findCourseYear";
import { intersectionType } from "@/interfaces/intersectionType";
import IntersectionSubjectFunction from "@/utils/IntersectionSubjectFunction";
import DataCastingSubjectFunction from "@/utils/DataCastingSubjectFunction";
import sumGeneralEducationFunc from "@/utils/sumGEF";

export const achievementRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ input, ctx }) => {
    try {
      const result = await getGrades({
        token: ctx.session.user.email?.accesstoken!,
      });

      const majorCode = ctx.session.user.email?.user.student.majorCode.trim()!;
      const idCode = ctx.session.user.email?.user.idCode.slice(0, 2).trim();

      const courseYear = findCourseYear(idCode!);

      if ((UnitRequireRaw as any)[majorCode] === undefined || (UnitRequireRaw as any)[majorCode][courseYear] === undefined) {
        return [];
      }

      const unitRequire = (UnitRequireRaw as any)[majorCode][courseYear];

      const genEdCreditRequire = unitRequire.Aesthetics + unitRequire.Language_and_Communication + unitRequire.Thai_Citizen_and_Global_Citizen + unitRequire.Entrepreneurship + unitRequire.Wellness + unitRequire.Other;

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

      const WellnessRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระอยู่ดีมีสุข"));
      const AestheticsRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระสุนทรียศาสตร์"));
      const EntrepreneurshipRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"));
      const Thai_Citizen_and_Global_CitizenRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระพลเมืองไทยและพลเมืองโลก"));
      const Language_and_CommunicationRaw = GenEdAll.filter((v) => v.subjectGroup.match("กลุ่มสาระภาษากับการสื่อสาร"));

      const Wellness: intersectionType[] = WellnessRaw.map(DataCastingSubjectFunction);
      const Aesthetics: intersectionType[] = AestheticsRaw.map(DataCastingSubjectFunction);
      const Entrepreneurship: intersectionType[] = EntrepreneurshipRaw.map(DataCastingSubjectFunction);
      const Thai_Citizen_and_Global_Citizen: intersectionType[] = Thai_Citizen_and_Global_CitizenRaw.map(DataCastingSubjectFunction);
      const Language_and_Communication: intersectionType[] = Language_and_CommunicationRaw.map(DataCastingSubjectFunction);

      const WellnessIntersect = _.intersectionWith(gradeAll, Wellness, IntersectionSubjectFunction);
      const AestheticsIntersect = _.intersectionWith(gradeAll, Aesthetics, IntersectionSubjectFunction);
      const EntrepreneurshipIntersect = _.intersectionWith(gradeAll, Entrepreneurship, IntersectionSubjectFunction);
      const Thai_Citizen_and_Global_CitizenIntersect = _.intersectionWith(gradeAll, Thai_Citizen_and_Global_Citizen, IntersectionSubjectFunction);
      const Language_and_CommunicationIntersect = _.intersectionWith(gradeAll, Language_and_Communication, IntersectionSubjectFunction);

      let OtherIntersect: intersectionType[] = [];

      const findAddToOther = (subjects: intersectionType[], position: number, current_credit: number, require_credit: number) => {
        if (current_credit < require_credit) {
          findAddToOther(subjects, position + 1, current_credit + subjects[position]?.subjectCredits!, require_credit);
        } else {
          if (subjects[position]) {
            OtherIntersect.push(subjects[position]!!);
          }
        }
      };

      findAddToOther(WellnessIntersect, 0, 0, unitRequire.Wellness);
      findAddToOther(AestheticsIntersect, 0, 0, unitRequire.Aesthetics);
      findAddToOther(EntrepreneurshipIntersect, 0, 0, unitRequire.Entrepreneurship);
      findAddToOther(Thai_Citizen_and_Global_CitizenIntersect, 0, 0, unitRequire.Thai_Citizen_and_Global_Citizen);
      findAddToOther(Language_and_CommunicationIntersect, 0, 0, unitRequire.Language_and_Communication);

      const sumToMax = (value: number, max: number) => {
        return value > max ? max : value;
      };

      const sumWellness = _.sumBy(WellnessIntersect, sumGeneralEducationFunc);
      const sumAesthetics = _.sumBy(AestheticsIntersect, sumGeneralEducationFunc);
      const sumEntrepreneurship = _.sumBy(EntrepreneurshipIntersect, sumGeneralEducationFunc);
      const sumThai_Citizen_and_Global_Citizen = _.sumBy(Thai_Citizen_and_Global_CitizenIntersect, sumGeneralEducationFunc);
      const sumLanguage_and_Communication = _.sumBy(Language_and_CommunicationIntersect, sumGeneralEducationFunc);
      const sumOther = _.sumBy(OtherIntersect, sumGeneralEducationFunc);

      const sumGeneral_EducationAll =
        sumToMax(sumWellness, unitRequire.Wellness) +
        sumToMax(sumAesthetics, unitRequire.Aesthetics) +
        sumToMax(sumEntrepreneurship, unitRequire.Entrepreneurship) +
        sumToMax(sumThai_Citizen_and_Global_Citizen, unitRequire.Thai_Citizen_and_Global_Citizen) +
        sumToMax(sumLanguage_and_Communication, unitRequire.Language_and_Communication) +
        sumToMax(sumOther, unitRequire.Other);

      return [
        {
          type: SubjectGroupEnum.General_Education,
          credit_require: genEdCreditRequire,
          credit_current: sumGeneral_EducationAll,
          children: [
            {
              type: SubjectGroupGenEdEnum.Wellness,
              credit_require: unitRequire.Wellness,
              credit_current: sumWellness,
              children: WellnessIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Aesthetics,
              credit_require: unitRequire.Aesthetics,
              credit_current: sumAesthetics,
              children: AestheticsIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Entrepreneurship,
              credit_require: unitRequire.Entrepreneurship,
              credit_current: sumEntrepreneurship,
              children: EntrepreneurshipIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Thai_Citizen_and_Global_Citizen,
              credit_require: unitRequire.Thai_Citizen_and_Global_Citizen,
              credit_current: sumThai_Citizen_and_Global_Citizen,
              children: Thai_Citizen_and_Global_CitizenIntersect,
            },
            {
              type: SubjectGroupGenEdEnum.Language_and_Communication,
              credit_require: unitRequire.Language_and_Communication,
              credit_current: sumLanguage_and_Communication,
              children: Language_and_CommunicationIntersect,
            },
            {
                type: SubjectGroupGenEdEnum.Other,
                credit_require: unitRequire.Other,
                credit_current: sumOther,
                children: OtherIntersect,
            }
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
