import { create } from 'zustand';

export type SnackbarType = 'info' | 'success' | 'error';
export type SnackbarSize = 'default' | 'small';

export interface SnackbarItem {
  id: number;
  message: string;
  type: SnackbarType;
  size: SnackbarSize;
}

const AUTO_HIDE_MS = 3000;

interface SnackbarState {
  snackbars: SnackbarItem[];
  showSnackbar: (message: string, type?: SnackbarType, size?: SnackbarSize) => void;
  removeSnackbar: (id: number) => void;
}

export const useSnackbarStore = create<SnackbarState>((set, get) => ({
  snackbars: [],

  showSnackbar: (message, type = 'info', size = 'default') => {
    const id = Date.now();
    set((state) => ({
      snackbars: [...state.snackbars, { id, message, type, size }],
    }));

    setTimeout(() => {
      get().removeSnackbar(id);
    }, AUTO_HIDE_MS);
  },

  removeSnackbar: (id) =>
    set((state) => ({
      snackbars: state.snackbars.filter((s) => s.id !== id),
    })),
}));
