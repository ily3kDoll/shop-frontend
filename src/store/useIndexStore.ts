import { create } from "zustand";

type ModalState = {
  keyword: string;
};

interface ModalAction extends ModalState {
  setKeyword: (keyword: string) => void;
}

export const useIndexStore = create<ModalAction>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}));
