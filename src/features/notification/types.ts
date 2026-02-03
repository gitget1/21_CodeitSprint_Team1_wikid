export interface Notification {
  id: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationListResponse {
  list: Notification[];
  totalCount: number;
}
