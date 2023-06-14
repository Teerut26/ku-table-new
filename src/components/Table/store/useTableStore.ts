import { create } from "zustand";

interface ExpandTableDataInterface {
  expand: boolean;
  imageBackground: string | null;
  handleExpand: () => void;
  setImageBackground: (image: string|null) => void;
}

const useTableStore = create<ExpandTableDataInterface>((set) => ({
  expand: false,
  imageBackground: null,
  handleExpand: () => {
    set((state) => {
      return {
        expand: !state.expand,
      };
    });
  },
  setImageBackground: (image) => {
    set((state) => {
      return {
        imageBackground: image,
      };
    });
  },
}));

export default useTableStore;
