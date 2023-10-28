import { create } from "zustand";

interface ModalTeam {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTeam = create<ModalTeam>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
