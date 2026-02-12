/** 댓글 작성자  v */
export interface CommentWriter {
  id: number;
  name: string;
  image?: string;
}

/** 댓글v */
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: CommentWriter;
}

/** 댓글 목록 조회 쿼리 파라미터 */
export interface CommentListParams {
  limit: number;
  cursor?: number;
}

/** 댓글 목록 API 응답 */
export interface CommentListResponse {
  nextCursor?: number;
  list: Comment[];
}
