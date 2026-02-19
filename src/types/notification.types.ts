/** 알림 한 건 */
export interface Notification {
  id: number;
  content: string;
  createdAt: string;
  /** 알림 종류 (예: failure 등) */
  type?: string;
}

/** 알림 목록 조회 쿼리 파라미터 (GET /notifications, teamId는 baseURL에 포함) */
export interface NotificationListParams {
  page: number;
  pageSize: number;
}

/** 알림 목록 API 응답 */
export interface NotificationListResponse {
  totalCount: number;
  list: Notification[];
}
