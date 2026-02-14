import { z } from 'zod';

/**
 * 로그인 폼 스키마
 */
export const loginSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해주세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.').min(8, '8자 이상 입력해주세요.'),
});

/**
 * 회원가입 폼 스키마
 */
export const signupSchema = z
  .object({
    name: z.string().min(1, '이름은 필수 입력입니다.').max(10, '10자 이하로 입력해주세요.'),
    email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해주세요.'),
    password: z.string().min(1, '비밀번호는 필수 입력입니다.').min(8, '8자 이상 입력해주세요.'),
    passwordConfirmation: z.string().min(1, '비밀번호 확인은 필수 입력입니다.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

/**
 * 비밀번호 변경 폼 스키마
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '기존 비밀번호는 필수 입력입니다.'),
    password: z.string().min(1, '새 비밀번호는 필수 입력입니다.').min(8, '8자 이상 입력해주세요.'),
    passwordConfirmation: z.string().min(1, '비밀번호 확인은 필수 입력입니다.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

/**
 * 위키 생성 폼 스키마
 */
export const createWikiSchema = z.object({
  securityQuestion: z.string().min(1, '질문은 필수 입력입니다.'),
  securityAnswer: z.string().min(1, '답은 필수 입력입니다.'),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
export type CreateWikiForm = z.infer<typeof createWikiSchema>;