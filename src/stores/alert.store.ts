import { create } from 'zustand';

interface AlertState {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  showAlert: (message: string, onConfirm?: () => void) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: undefined,
  showAlert: (message: string, onConfirm?: () => void) =>
    set({ isOpen: true, message, onConfirm }),
  closeAlert: () => set({ isOpen: false, message: '', onConfirm: undefined }),
}));
