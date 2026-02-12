import type { NotificationListParams, NotificationListResponse } from '@/types/notification.types';

import instance from './axios';

// 알림 API

/**
 * 알림 목록 조회 (GET /notifications)
 */
export const getNotifications = async (
  params: NotificationListParams
): Promise<NotificationListResponse> => {
  const response = await instance.get<NotificationListResponse>('/notifications', { params });
  return response.data;
};

/**
 * 알림 삭제 (DELETE /notifications/{notificationId})
 */
export const deleteNotification = async (notificationId: number): Promise<void> => {
  await instance.delete(`/notifications/${notificationId}`);
};
