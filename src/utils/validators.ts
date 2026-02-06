/**
 * 이메일 유효성 검사
 * @example isValidEmail('test@example.com') // true
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 유효성 검사 (8자 이상)
 * @example isValidPassword('password123') // true
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * 비밀번호 확인 일치 검사
 */
export function isPasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * 이름 유효성 검사 (2자 이상, 10자 이하)
 */
export function isValidName(name: string): boolean {
  return name.length >= 2 && name.length <= 10;
}

/**
 * 필수 입력값 검사
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * 에러 메시지 반환
 */
export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_INVALID: '올바른 이메일 형식이 아닙니다.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_MIN_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  NAME_REQUIRED: '이름을 입력해주세요.',
  NAME_LENGTH: '이름은 2자 이상 10자 이하로 입력해주세요.',
} as const;
