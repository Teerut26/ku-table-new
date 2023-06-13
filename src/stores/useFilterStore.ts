import { create } from "zustand";

export type sectionType = "Lecture" | "Laboratory";
export type sectionStudentType = "Regular" | "Special";
export type sectionDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

interface Filter {
  sectionType: sectionType[];
  sectionStudentType: sectionStudentType[];
  sectionDay: sectionDay[];
  addSectionType: (sectionType: sectionType) => void;
  removeSectionType: (sectionType: sectionType) => void;
  addSectionStudentType: (sectionStudentType: sectionStudentType) => void;
  removeSectionStudentType: (sectionStudentType: sectionStudentType) => void;
  addDay: (sectionDay: sectionDay) => void;
  removeDay: (sectionDay: sectionDay) => void;
}

const useFilterStore = create<Filter>((set) => ({
  sectionType: [],
  removeSectionType: (sectionType: sectionType) => {
    set((state) => {
      return {
        sectionType: state.sectionType.filter((type) => type !== sectionType),
      };
    });
  },
  addSectionType: (sectionType: sectionType) => {
    set((state) => {
      return {
        sectionType: [...state.sectionType, sectionType],
      };
    });
  },
  sectionStudentType: [],
  removeSectionStudentType: (sectionStudentType: sectionStudentType) => {
    set((state) => {
      return {
        sectionStudentType: state.sectionStudentType.filter(
          (type) => type !== sectionStudentType
        ),
      };
    });
  },
  addSectionStudentType: (sectionStudentType: sectionStudentType) => {
    set((state) => {
      return {
        sectionStudentType: [...state.sectionStudentType, sectionStudentType],
      };
    });
  },
  sectionDay: [],
  addDay: (sectionDay: sectionDay) => {
    set((state) => {
      return {
        sectionDay: [...state.sectionDay, sectionDay],
      };
    });
  },
  removeDay: (sectionDay: sectionDay) => {
    set((state) => {
      return {
        sectionDay: state.sectionDay.filter((day) => day !== sectionDay),
      };
    });
  },
}));

export default useFilterStore;
