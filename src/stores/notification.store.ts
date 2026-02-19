import { create } from 'zustand';

import type { Notification } from '@/types/notification.types';

/** 알림 목록 갱신 트리거 (위키 저장 등 후 NavBar에서 다시 불러올 때 사용) */
interface NotificationTriggerState {
  refetchTrigger: number;
  triggerRefetch: () => void;
}

export const useNotificationTriggerStore = create<NotificationTriggerState>((set) => ({
  refetchTrigger: 0,
  triggerRefetch: () => set((s) => ({ refetchTrigger: s.refetchTrigger + 1 })),
}));

/** 알림 목록 (API + 로컬 추가분). id < 0 이면 로컬 전용(삭제 시 API 호출 안 함) */
interface NotificationListState {
  notifications: Notification[];
  setNotificationsFromApi: (list: Notification[]) => void;
  addLocalNotification: (content: string) => void;
  removeNotification: (id: number) => void;
}

export const useNotificationListStore = create<NotificationListState>((set) => ({
  notifications: [],
  setNotificationsFromApi: (list) =>
    set((s) => ({
      notifications: [...s.notifications.filter((n) => n.id < 0), ...list],
    })),
  addLocalNotification: (content) =>
    set((s) => ({
      notifications: [
        {
          id: -Date.now(),
          content,
          createdAt: new Date().toISOString(),
          type: 'success',
        },
        ...s.notifications,
      ],
    })),
  removeNotification: (id) =>
    set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
}));
