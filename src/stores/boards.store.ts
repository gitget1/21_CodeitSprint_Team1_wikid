import { create } from 'zustand';

import { ArticleListResponse } from '@/api/board.api';

interface ArticlesState {
  articles: ArticleListResponse | null;
  isLoading: boolean;
  error: string | null;

  setArticles: (data: ArticleListResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clearArticles: () => void;
}

export const useArticlesStore = create<ArticlesState>((set) => ({
  articles: null,
  isLoading: false,
  error: null,

  setArticles: (data) => set({ articles: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),

  clearArticles: () => set({ articles: null }),
}));
