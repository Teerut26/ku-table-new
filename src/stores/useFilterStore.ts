import { create } from "zustand";

export type sectionType = "Lecture" | "Laboratory";
export type sectionStudentType = "Regular" | "Special";
export type sectionDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

interface Filter {
  sectionType: sectionType[];
  sectionStudentType: sectionStudentType[];
  sectionDay: sectionDay[];
  showFilterMobile: boolean;
  showFilterDesktop: boolean;
  result: number;
  expandAll: boolean;
  addSectionType: (sectionType: sectionType) => void;
  removeSectionType: (sectionType: sectionType) => void;
  addSectionStudentType: (sectionStudentType: sectionStudentType) => void;
  removeSectionStudentType: (sectionStudentType: sectionStudentType) => void;
  addDay: (sectionDay: sectionDay) => void;
  removeDay: (sectionDay: sectionDay) => void;
  setShowFilterMobile: (showFilter: boolean) => void;
  handleShowFilterMobile: () => void;
  setShowFilterDesktop: (showFilter: boolean) => void;
  handleShowFilterDesktop: () => void;
  setResult: (result: number) => void;
  setExpandAll: (expandAll: boolean) => void;
  handleExpandAll: () => void;
}

const useFilterStore = create<Filter>((set) => ({
  result: 0,
  expandAll: false,
  showFilterMobile: false,
  showFilterDesktop: true,
  sectionType: [],
  handleExpandAll: () => {
    set((state) => {
      return {
        expandAll: !state.expandAll,
      };
    });
  },
  setExpandAll: (expandAll: boolean) => {
    set((state) => {
      return {
        expandAll: expandAll,
      };
    });
  },
  setResult: (result: number) => {
    set((state) => {
      return {
        result: result,
      };
    });
  },
  setShowFilterDesktop: (showFilter: boolean) => {
    set((state) => {
      return {
        showFilterDesktop: showFilter,
      };
    });
  },
  handleShowFilterDesktop: () => {
    set((state) => {
      return {
        showFilterDesktop: !state.showFilterDesktop,
      };
    });
  },
  setShowFilterMobile: (showFilter: boolean) => {
    set((state) => {
      return {
        showFilterMobile: showFilter,
      };
    });
  },
  handleShowFilterMobile: () => {
    set((state) => {
      return {
        showFilterMobile: !state.showFilterMobile,
      };
    });
  },
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
