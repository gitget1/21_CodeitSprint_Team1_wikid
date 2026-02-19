import { create } from 'zustand';

import { Comment, CommentListResponse } from '@/types/comment.types';

interface commentState {
  comment: CommentListResponse | null;
  isLoading: boolean;
  error: string | null;

  setComment: (data: CommentListResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clearComment: () => void;
  addCommentToList: (newComment: Comment) => void;
  updateCommentInList: (updated: Comment) => void;
  removeCommentFromList: (commentId: number) => void;
}
const EMPTY: CommentListResponse = { list: [] };
export const useCommentStore = create<commentState>((set) => ({
  comment: null,
  isLoading: false,
  error: null,
  setComment: (data) => set({ comment: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),

  clearComment: () => set({ comment: null, error: null }),

  addCommentToList: (newComment) =>
    set((state) => {
      const current = state.comment ?? EMPTY;

      const next: CommentListResponse = {
        ...current,
        list: [newComment, ...current.list],
      };

      return { comment: next };
    }),

  updateCommentInList: (updated) =>
    set((state) => {
      const current = state.comment ?? EMPTY;

      const next: CommentListResponse = {
        ...current,
        list: current.list.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)),
      };

      return { comment: next };
    }),

  removeCommentFromList: (commentId) =>
    set((state) => {
      const current = state.comment ?? EMPTY;

      const next: CommentListResponse = {
        ...current,
        list: current.list.filter((c) => c.id !== commentId),
      };

      return { comment: next };
    }),
}));
