import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

interface UIState {
  // 모달 상태
  modal: ModalState;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  // 사이드바 상태 (모바일)
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 모달
  modal: {
    isOpen: false,
    content: null,
  },
  openModal: (content) =>
    set({
      modal: {
        isOpen: true,
        content,
      },
    }),
  closeModal: () =>
    set({
      modal: {
        isOpen: false,
        content: null,
      },
    }),

  // 사이드바
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  closeSidebar: () =>
    set({
      isSidebarOpen: false,
    }),
}));
