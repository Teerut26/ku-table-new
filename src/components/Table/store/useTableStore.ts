import { create } from "zustand";

interface ExpandTableDataInterface {
  expand: boolean;
  handleExpand: () => void;
}

const useTableStore = create<ExpandTableDataInterface>((set) => ({
  expand: false,
  handleExpand: () => {
    set((state) => {
      return {
        expand: !state.expand,
      };
    });
  },
}));

export default useTableStore;
