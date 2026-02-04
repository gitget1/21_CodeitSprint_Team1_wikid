import { create } from 'zustand';

import instance from '@/api/axios';

// 알림 타입 정의
export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

interface NotificationState {
  // 상태
  notifications: Notification[];
  totalCount: number;
  isLoading: boolean;

  // 액션
  fetchNotifications: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  // 초기 상태
  notifications: [],
  totalCount: 0,
  isLoading: false,

  // 알림 목록 조회
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const response = await instance.get('/notifications');
      set({
        notifications: response.data.list,
        totalCount: response.data.totalCount,
      });
    } catch (error) {
      console.error('알림 조회 실패:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 알림 삭제
  deleteNotification: async (id: number) => {
    try {
      await instance.delete(`/notifications/${id}`);
      const { notifications } = get();
      set({
        notifications: notifications.filter((n) => n.id !== id),
        totalCount: get().totalCount - 1,
      });
    } catch (error) {
      console.error('알림 삭제 실패:', error);
    }
  },

  // 모든 알림 초기화 (로그아웃 시)
  clearAll: () =>
    set({
      notifications: [],
      totalCount: 0,
    }),
}));

export default useNotificationStore;
