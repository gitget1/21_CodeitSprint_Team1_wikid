import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { createComment, deleteComment, getComments, updateComment } from '@/api/comment.api';
import { useCommentStore } from '@/stores/comment.store';
import { CommentListParams } from '@/types/comment.types';

export default function useComment() {
  const {
    setComment,
    setLoading,
    setError,
    addCommentToList,
    updateCommentInList,
    removeCommentFromList,
  } = useCommentStore();

  const fetchComment = useCallback(
    async (articleId: number, params: CommentListParams) => {
      try {
        setLoading(false);
        setError(null);
        const data = await getComments(articleId, params);
        setComment(data);
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        const message = e.response?.data?.message || '댓글 목록을 불러오지 못했습니다.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [setComment, setLoading, setError]
  );
  const postComment = useCallback(
    async (articleId: number, content: string) => {
      try {
        setLoading(true);
        setError(null);

        const created = await createComment(articleId, content);
        addCommentToList(created);
        return created;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        const message = e.response?.data?.message || '댓글 작성에 실패했습니다.';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, addCommentToList]
  );

  const patchComment = useCallback(
    async (commentId: number, content: string) => {
      try {
        setLoading(true);
        setError(null);

        const updated = await updateComment(commentId, content);
        updateCommentInList(updated);
        return updated;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        const message = e.response?.data?.message || '댓글 수정에 실패했습니다.';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, updateCommentInList]
  );

  const removeComment = useCallback(
    async (commentId: number) => {
      try {
        setLoading(true);
        setError(null);

        await deleteComment(commentId);
        removeCommentFromList(commentId);
        return true;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        const message = e.response?.data?.message || '댓글 삭제에 실패했습니다.';
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, removeCommentFromList]
  );

  return { fetchComment, postComment, patchComment, removeComment };
}
