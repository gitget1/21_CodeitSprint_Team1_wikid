import { create } from 'zustand';

import type { Profile } from '@/api/wiki.api';

interface WikiState {
  // 상태
  currentProfile: Profile | null;
  isEditing: boolean;
  editStartTime: Date | null;
  hasEditPermission: boolean;

  // 액션
  setCurrentProfile: (profile: Profile | null) => void;
  startEditing: () => void;
  stopEditing: () => void;
  setEditPermission: (hasPermission: boolean) => void;
  reset: () => void;
}

export const useWikiStore = create<WikiState>((set) => ({
  // 초기 상태
  currentProfile: null,
  isEditing: false,
  editStartTime: null,
  hasEditPermission: false,

  // 현재 프로필 설정
  setCurrentProfile: (profile) => set({ currentProfile: profile }),

  // 수정 모드 시작
  startEditing: () =>
    set({
      isEditing: true,
      editStartTime: new Date(),
    }),

  // 수정 모드 종료
  stopEditing: () =>
    set({
      isEditing: false,
      editStartTime: null,
    }),

  // 수정 권한 설정 (퀴즈 정답 시)
  setEditPermission: (hasPermission) =>
    set({
      hasEditPermission: hasPermission,
      // 권한 없으면 수정 모드도 종료
      ...(hasPermission ? {} : { isEditing: false, editStartTime: null }),
    }),

  // 상태 초기화 (페이지 이탈 시)
  reset: () =>
    set({
      currentProfile: null,
      isEditing: false,
      editStartTime: null,
      hasEditPermission: false,
    }),
}));

export default useWikiStore;
