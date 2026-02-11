import type { Comment, CommentListParams, CommentListResponse } from '@/types/comment.types';

import instance from './axios';

// 댓글 API 함수들

/**
 * 댓글 작성
 */
export const createComment = async (articleId: number, content: string): Promise<Comment> => {
  const response = await instance.post(`/articles/${articleId}/comments`, { content });
  return response.data;
};

/**
 * 댓글 목록 조회
 */
export const getComments = async (
  articleId: number,
  params: CommentListParams
): Promise<CommentListResponse> => {
  const response = await instance.get(`/articles/${articleId}/comments`, {
    params,
  });
  return response.data;
};

/**
 * 댓글 수정
 */
export const updateComment = async (commentId: number, content: string): Promise<Comment> => {
  const response = await instance.patch(`/comments/${commentId}`, { content });
  return response.data;
};

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: number): Promise<void> => {
  await instance.delete(`/comments/${commentId}`);
};
