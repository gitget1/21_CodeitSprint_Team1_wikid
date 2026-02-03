// API 엔드포인트 상수
export const ENDPOINTS = {
  // 인증
  AUTH: {
    SIGN_IN: '/auth/signIn',
    SIGN_UP: '/auth/signUp',
    REFRESH: '/auth/refresh',
  },
  
  // 사용자
  USERS: {
    ME: '/users/me',
    PASSWORD: '/users/me/password',
  },
  
  // 프로필 (위키)
  PROFILES: {
    LIST: '/profiles',
    DETAIL: (code: string) => `/profiles/${code}`,
    PING: (code: string) => `/profiles/${code}/ping`,
  },
  
  // 게시글
  ARTICLES: {
    LIST: '/articles',
    DETAIL: (id: number) => `/articles/${id}`,
    LIKE: (id: number) => `/articles/${id}/like`,
    COMMENTS: (id: number) => `/articles/${id}/comments`,
  },
  
  // 댓글
  COMMENTS: {
    DETAIL: (id: number) => `/comments/${id}`,
  },
  
  // 알림
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (id: number) => `/notifications/${id}`,
  },
  
  // 이미지
  IMAGES: {
    UPLOAD: '/images/upload',
  },
} as const;
