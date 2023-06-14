import { NextPage } from "next";
import useSearchStore from "./store/useSearchStore";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Subject from "./Subject";
import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";
import useFilterStore from "@/stores/useFilterStore";
import CourseDateSeparate from "@/utils/courseDateSeparate";
import _ from "lodash";
import { isTimeInRanges } from "@/utils/timeMap";

interface Props {}

const ListSubject: NextPage<Props> = () => {
  const { selectedSubjectCode } = useSearchStore((r) => r);
  const {
    sectionDay,
    sectionStudentType,
    sectionType,
    setResult,
    sectionTime,
  } = useFilterStore((r) => r);
  const [subjectsDataTemp, setSubjectsDataTemp] = useState<
    OpenSubjectForEnrollInterface[]
  >([]);
  const subjectsApi = api.subject.gets.useMutation();

  useEffect(() => {
    if (!selectedSubjectCode || selectedSubjectCode.length <= 0) return;
    subjectsApi.mutate({
      query: selectedSubjectCode,
    });
  }, [selectedSubjectCode]);

  useEffect(() => {
    if (!subjectsApi.data) return;
    setSubjectsDataTemp(Filter(subjectsApi.data.results));
  }, [
    subjectsApi.data,
    sectionDay,
    sectionStudentType,
    sectionType,
    sectionTime,
  ]);

  if (subjectsApi.isLoading) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  const Filter = (input: OpenSubjectForEnrollInterface[]) => {
    try {
      const sectionTypeFiltedRaw =
        input.filter((subject) => {
          return sectionType.includes(subject.sectionTypeEn as any);
        }) || input;

      let sectionTypeFilted =
        sectionType.length === 0 ? input : sectionTypeFiltedRaw;

      const sectionStudentTypeFiltedRaw = sectionTypeFilted.filter(
        (subject) => {
          return sectionStudentType.includes(subject.stdStatusEn as any);
        }
      );

      let sectionStudentTypeFilted =
        sectionStudentType.length === 0
          ? sectionTypeFilted
          : sectionStudentTypeFiltedRaw;

      const sectionDayFiltedRaw = sectionStudentTypeFilted.filter((subject) => {
        const daySeparate = CourseDateSeparate(subject.coursedate).map(
          (day) => day.day_w
        );
        return _.intersection(sectionDay, daySeparate).length > 0;
      });

      let sectionDayFilted =
        sectionDay.length === 0
          ? sectionStudentTypeFilted
          : sectionDayFiltedRaw;

      const sectionTimeFiltedRaw = sectionDayFilted.filter((subject) => {
        const daySeparate = CourseDateSeparate(subject.coursedate).filter(
          (day) => {
            return isTimeInRanges(
              sectionTime?.timeFrom!,
              sectionTime?.timeTo!,
              day.time_from!,
              day.time_to!
            );
          }
        ).length > 0;

        return daySeparate;
      });

      const sectionTimeFilted = sectionTime ? sectionTimeFiltedRaw : sectionDayFilted;

      setResult(sectionTimeFilted.length);
      return sectionTimeFilted;
    } catch (error) {
      return input;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {subjectsApi.data &&
        subjectsApi.data.results.length > 0 &&
        subjectsDataTemp.map((subject, index) => (
          <Subject subject={subject} key={index} />
        ))}
    </div>
  );
};

export default ListSubject;
