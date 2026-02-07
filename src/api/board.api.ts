import instance from './axios';

// 타입 정의
export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
  };
}

export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}

export interface ArticleListParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  image?: string | null;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
    image: string | null;
  };
}

export interface CommentListResponse {
  nextCursor: number | null;
  list: Comment[];
}

// 게시판 API 함수들
export const boardApi = {
  /**
   * 게시글 목록 조회
   */
  getArticles: async (params?: ArticleListParams): Promise<ArticleListResponse> => {
    const response = await instance.get('/articles', { params });
    return response.data;
  },

  /**
   * 게시글 상세 조회
   */
  getArticle: async (articleId: number): Promise<Article> => {
    const response = await instance.get(`/articles/${articleId}`);
    return response.data;
  },

  /**
   * 게시글 작성
   */
  createArticle: async (data: CreateArticleRequest): Promise<Article> => {
    const response = await instance.post('/articles', data);
    return response.data;
  },

  /**
   * 게시글 수정
   */
  updateArticle: async (articleId: number, data: CreateArticleRequest): Promise<Article> => {
    const response = await instance.patch(`/articles/${articleId}`, data);
    return response.data;
  },

  /**
   * 게시글 삭제
   */
  deleteArticle: async (articleId: number): Promise<void> => {
    await instance.delete(`/articles/${articleId}`);
  },

  /**
   * 게시글 좋아요
   */
  likeArticle: async (articleId: number): Promise<Article> => {
    const response = await instance.post(`/articles/${articleId}/like`);
    return response.data;
  },

  /**
   * 게시글 좋아요 취소
   */
  unlikeArticle: async (articleId: number): Promise<Article> => {
    const response = await instance.delete(`/articles/${articleId}/like`);
    return response.data;
  },

  /**
   * 댓글 목록 조회
   */
  getComments: async (articleId: number, cursor?: number): Promise<CommentListResponse> => {
    const response = await instance.get(`/articles/${articleId}/comments`, {
      params: { cursor },
    });
    return response.data;
  },

  /**
   * 댓글 작성
   */
  createComment: async (articleId: number, content: string): Promise<Comment> => {
    const response = await instance.post(`/articles/${articleId}/comments`, { content });
    return response.data;
  },

  /**
   * 댓글 수정
   */
  updateComment: async (commentId: number, content: string): Promise<Comment> => {
    const response = await instance.patch(`/comments/${commentId}`, { content });
    return response.data;
  },

  /**
   * 댓글 삭제
   */
  deleteComment: async (commentId: number): Promise<void> => {
    await instance.delete(`/comments/${commentId}`);
  },
};

export default boardApi;
