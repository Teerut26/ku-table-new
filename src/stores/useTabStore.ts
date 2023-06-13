import { create } from "zustand";

interface Tap {
  tab: string;
  setTab: (tab: string) => void;
}

const useTapStore = create<Tap>((set) => ({
  tab: "tab1",
  setTab: (tab: string) => {
    set((state) => {
      return {
        tab: tab,
      };
    });
  },
}));

export default useTapStore;
