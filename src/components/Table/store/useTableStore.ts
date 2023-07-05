import { create } from "zustand";

interface ExpandTableDataInterface {
  expand: boolean;
  imageBackground: string | null;
  opacity: number | null;
  opacityTable: number | null;
  handleExpand: () => void;
  setImageBackground: (image: string | null) => void;
  setOpacity: (value: number | null) => void;
  setOpacityTable: (value: number | null) => void;
}

const useTableStore = create<ExpandTableDataInterface>((set) => ({
  expand: true,
  imageBackground: null,
  opacity: null,
  opacityTable: null,
  setOpacityTable: (value) => {
    set((state) => {
      return {
        opacityTable: value,
      };
    });
  },
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
