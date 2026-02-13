import type {
  ArticleDetail,
  ArticleListParams,
  ArticleListResponse,
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/types/board.types';

import instance from './axios';

export type {
  Article,
  ArticleDetail,
  ArticleListParams,
  ArticleListResponse,
  ArticleWriter,
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/types/board.types';

// 게시판 API 함수들

/**
 * 게시글 작성
 */
export const createArticle = async (data: CreateArticleRequest): Promise<ArticleDetail> => {
  const response = await instance.post('/articles', data);
  return response.data;
};

/**
 * 게시글 목록 조회
 */
export const getArticles = async (params: ArticleListParams): Promise<ArticleListResponse> => {
  const response = await instance.get('/articles', { params });
  return response.data;
};

/**
 * 게시글 상세 조회
 */
export const getArticle = async (articleId: number): Promise<ArticleDetail> => {
  const response = await instance.get(`/articles/${articleId}`);
  return response.data;
};

/**
 * 게시글 수정
 */
export const updateArticle = async (
  articleId: number,
  data: UpdateArticleRequest
): Promise<ArticleDetail> => {
  const response = await instance.patch(`/articles/${articleId}`, data);
  return response.data;
};

/**
 * 게시글 삭제
 */
export const deleteArticle = async (articleId: number): Promise<void> => {
  await instance.delete(`/articles/${articleId}`);
};

/**
 * 게시글 좋아요
 */
export const likeArticle = async (articleId: number): Promise<ArticleDetail> => {
  const response = await instance.post(`/articles/${articleId}/like`);
  return response.data;
};

/**
 * 게시글 좋아요 취소
 */
export const unlikeArticle = async (articleId: number): Promise<ArticleDetail> => {
  const response = await instance.delete(`/articles/${articleId}/like`);
  return response.data;
};
