import { Course } from "@/interfaces/GroupCourseResponseInterface";
import { create } from "zustand";
import { v4 as uuid } from "uuid";

interface SearchType {
  keyword: string;
  setKeyword: (keyword: string) => void;
  clearKeyword: () => void;
  selectedSubjectCode: string | null;
  setSelectedSubjectCode: (subjectCode: string) => void;
  clearSelectedSubjectCode: () => void;
}

const useSearchStore = create<SearchType>((set) => ({
  keyword: "",
  selectedSubjectCode: null,
  setSelectedSubjectCode: (subjectCode: string) => {
    set((state) => ({
      selectedSubjectCode: subjectCode,
    }));
  },
  clearSelectedSubjectCode: () => {
    set((state) => ({
      selectedSubjectCode: null,
    }));
  },
  setKeyword: (keyword: string) => {
    set((state) => ({
      keyword: keyword,
    }));
  },
  clearKeyword: () => {
    set((state) => ({
      keyword: "",
    }));
  },
}));

export default useSearchStore;
