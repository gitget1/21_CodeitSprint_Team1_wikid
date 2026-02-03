export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: string;
    name: string;
  };
}

export interface ArticleListResponse {
  list: Article[];
  totalCount: number;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  image?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface CommentListResponse {
  list: Comment[];
  nextCursor?: number;
}
