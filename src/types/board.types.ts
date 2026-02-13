/** 게시글 작성자 v*/
export interface ArticleWriter {
  id: number;
  name: string;
}

/** 게시글 (목록용, content·isLiked 없음) */
export interface Article {
  id: number;
  title: string;
  image?: string;
  writer: ArticleWriter;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}
/** 게시글 목록 조회 쿼리 파라미터 */
export interface ArticleListParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
}
/** 게시글 상세 조회(content·isLiked 포함) */
export interface ArticleDetail extends Article {
  content: string;
  isLiked: boolean;
}

/** 게시글 목록 API 응답 */
export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}

/** 게시글 생성 요청 body (POST /articles) */
export interface CreateArticleRequest {
  title: string;
  content: string;
  image?: string;
}

/** 게시글 수정 요청 body (PATCH /articles/{id}) - 변경할 필드만 전송 */
export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  image?: string;
}
