import { GenEdServiceResponseInterface } from "@/services/get-gened";
import { create } from "zustand";

interface Filter {
  genEd: GenEdServiceResponseInterface[];
  genTemp: GenEdServiceResponseInterface[];
  lastScrollPosition: number;
  setGenEd: (genEd: GenEdServiceResponseInterface[]) => void;
  filterGenEd: (filterGroup: string) => void;
  setLastScrollPosition: (lastScrollPosition: number) => void;
}

const useGenEdStore = create<Filter>((set) => ({
  genEd: [],
  genTemp: [],
  lastScrollPosition: 0,
  setGenEd: (genEd: GenEdServiceResponseInterface[]) => {
    set((state) => {
      return {
        genEd: genEd,
        genTemp: genEd,
      };
    });
  },
  filterGenEd: (filterGroup: string) => {
    set((state) => {
      return {
        genTemp: filterGroup.length > 0 ? state.genEd.filter((gen) => gen.subjectGroup === filterGroup) : state.genEd,
      };
    });
  },

  setLastScrollPosition: (lastScrollPosition: number) => {
    set((state) => {
      return {
        lastScrollPosition: lastScrollPosition,
      };
    });
  },
}));

export default useGenEdStore;
