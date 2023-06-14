import { create } from "zustand";

interface ExpandTableDataInterface {
  expand: boolean;
  imageBackground: string | null;
  opacity: number | null;
  handleExpand: () => void;
  setImageBackground: (image: string | null) => void;
  setOpacity: (value: number | null) => void;
}

const useTableStore = create<ExpandTableDataInterface>((set) => ({
  expand: false,
  imageBackground: null,
  opacity: null,
  setOpacity: (value) => {
    set((state) => {
      return {
        opacity: value,
      };
    });
  },
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
