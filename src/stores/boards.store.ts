import { create } from 'zustand';

import { ArticleDetail, ArticleListResponse } from '@/api/board.api';

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

interface ArticleState {
  article: ArticleDetail | null;
  isLoading: boolean;
  error: string | null;
  setArticle: (data: ArticleDetail | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clearArticle: () => void;
}
export const useArticleStore = create<ArticleState>((set) => ({
  article: null,
  isLoading: false,
  error: null,
  setArticle: (data) => set({ article: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),
  clearArticle: () => set({ article: null }),
}));
interface CreateArticleState {
  createdArticle: ArticleDetail | null;
  isLoading: boolean;
  error: string | null;

  setCreatedArticle: (data: ArticleDetail | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clear: () => void;
}

export const useCreateArticleStore = create<CreateArticleState>((set) => ({
  createdArticle: null,
  isLoading: false,
  error: null,

  setCreatedArticle: (data) => set({ createdArticle: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),

  clear: () => set({ createdArticle: null, isLoading: false, error: null }),
}));
