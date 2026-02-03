// 공통 API 응답 타입
export interface ApiError {
  message: string;
  statusCode: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SearchParams extends PaginationParams {
  keyword?: string;
}

// 공통 목록 응답
export interface ListResponse<T> {
  list: T[];
  totalCount: number;
}

// 커서 기반 페이지네이션
export interface CursorListResponse<T> {
  list: T[];
  nextCursor?: number;
}
