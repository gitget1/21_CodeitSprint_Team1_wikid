import { useCallback } from 'react';
import { AxiosError } from 'axios';

import {
  createArticle,
  CreateArticleRequest,
  deleteArticle,
  getArticle,
  getArticles,
  likeArticle,
  unlikeArticle,
  updateArticle,
  UpdateArticleRequest,
} from '@/api/board.api';
import { useArticlesStore, useArticleStore, useCreateArticleStore } from '@/stores/boards.store';

export default function useArticles() {
  const { setArticles, setLoading: setListLoading, setError: setListError } = useArticlesStore();

  const {
    setArticle,
    setLoading: setDetailLoading,
    setError: setDetailError,
    clearArticle,
  } = useArticleStore();

  const {
    setCreatedArticle,
    setLoading: setCreateLoading,
    setError: setCreateError,
    clear,
  } = useCreateArticleStore();
  const fetchArticles = useCallback(async () => {
    try {
      setListLoading(true);
      setListError(null);

      const data = await getArticles({ pageSize: 1000 });
      setArticles(data);
    } catch (error) {
      const e = error as AxiosError<{ message: string }>;
      const message = e.response?.data?.message || '게시글 목록을 불러오지 못했습니다.';
      setListError(message);
    } finally {
      setListLoading(false);
    }
  }, [setArticles, setListLoading, setListError]);

  const fetchArticle = useCallback(
    async (id: number) => {
      try {
        setDetailLoading(true);
        setDetailError(null);

        const data = await getArticle(id);
        setArticle(data);
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        const message = e.response?.data?.message || '게시글 상세를 불러오지 못했습니다.';
        setDetailError(message);
      } finally {
        setDetailLoading(false);
      }
    },
    [setArticle, setDetailLoading, setDetailError]
  );
  const patchArticle = useCallback(
    async (articleId: number, data: UpdateArticleRequest) => {
      try {
        setDetailLoading(true);
        setDetailError(null);

        const updated = await updateArticle(articleId, data);
        setArticle(updated);
        return updated;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        setDetailError(e.response?.data?.message || '게시글 수정에 실패했습니다.');
        return null;
      } finally {
        setDetailLoading(false);
      }
    },
    [setArticle, setDetailLoading, setDetailError]
  );

  const removeArticle = useCallback(
    async (articleId: number) => {
      try {
        setDetailLoading(true);
        setDetailError(null);

        await deleteArticle(articleId);
        clearArticle();
        return true;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        setDetailError(e.response?.data?.message || '게시글 삭제에 실패했습니다.');
        return false;
      } finally {
        setDetailLoading(false);
      }
    },
    [clearArticle, setDetailLoading, setDetailError]
  );

  const doLike = useCallback(
    async (articleId: number) => {
      try {
        const updated = await likeArticle(articleId);

        setArticle(updated);
        return updated;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        setDetailError(e.response?.data?.message || '좋아요에 실패했습니다.');
        return null;
      }
    },
    [setArticle, setDetailError]
  );

  const undoLike = useCallback(
    async (articleId: number) => {
      try {
        const updated = await unlikeArticle(articleId);
        setArticle(updated);
        return updated;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        setDetailError(e.response?.data?.message || '좋아요 취소에 실패했습니다.');
        return null;
      }
    },
    [setArticle, setDetailError]
  );
  const postArticle = useCallback(
    async (data: CreateArticleRequest) => {
      try {
        setCreateLoading(true);
        setCreateError(null);
        const created = await createArticle(data);
        setCreatedArticle(created);
        return created;
      } catch (error) {
        const e = error as AxiosError<{ message: string }>;
        const message = e.response?.data?.message || '게시글 작성에 실패했습니다.';
        setCreateError(message);
        return null;
      } finally {
        setCreateLoading(false);
      }
    },
    [setCreateLoading, setCreateError, setCreatedArticle]
  );
  return {
    fetchArticles,
    fetchArticle,
    patchArticle,
    removeArticle,
    doLike,
    undoLike,
    postArticle,
  };
}
