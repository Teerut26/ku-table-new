import { NextPage } from "next";
import useSearchStore from "./store/useSearchStore";
import { api } from "@/utils/api";
import { useEffect } from "react";
import Subject from "./Subject";
import { v4 } from "uuid";
import { sha256 } from "@/utils/hashCourse";
import useCartSubjectStore from "@/stores/useCartSubjectStore";

interface Props {}

const ListSubject: NextPage<Props> = () => {
  const { selectedSubjectCode } = useSearchStore((r) => r);
  const subjectsApi = api.subject.gets.useMutation();

  useEffect(() => {
    if (!selectedSubjectCode || selectedSubjectCode.length <= 0) return;
    subjectsApi.mutate({
      query: selectedSubjectCode,
    });
  }, [selectedSubjectCode]);

  if (subjectsApi.isLoading) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {subjectsApi.data &&
        subjectsApi.data.results.length > 0 &&
        subjectsApi.data.results
          .map((subject, index) => <Subject subject={subject} key={index} />)}
    </div>
  );
};

export default ListSubject;
