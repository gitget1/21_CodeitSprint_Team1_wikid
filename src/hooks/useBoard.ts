import { useCallback } from 'react';
import { AxiosError } from 'axios';

import { getArticles } from '@/api/board.api';
import { useArticlesStore } from '@/stores/boards.store';

export default function useArticles() {
  const { setArticles, setLoading, setError } = useArticlesStore();

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getArticles({ pageSize: 1000 });
      setArticles(data);
    } catch (error) {
      const e = error as AxiosError<{ message: string }>;
      const message = e.response?.data?.message || '게시글 목록을 불러오지 못했습니다.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [setArticles, setLoading, setError]);

  return { fetchArticles };
}
