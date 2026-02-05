import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  interface LoginForm {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<LoginForm>();

  const labelStyle: string = `py-2.25 px-3.75 flex gap-4 items-center justify-start rounded-[10px] mt-2.5`;
  return (
    <div className="flex flex-col items-center m-auto my-15">
      <h1 className="text-2xl-semibold">로그인</h1>
      <form
        noValidate
        className="w-84 md:w-100 flex flex-col gap-6 mt-12.5"
        onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <div>
          <span className="text-md-regular text-gray-500">이메일</span>
          <label
            htmlFor="email"
            className={`${labelStyle} ${errors.email ? 'bg-secondary-red-100' : 'bg-gray-100'}`}
          >
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              className="w-full"
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식으로 작성해주세요.',
                },
              })}
              aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
            />
          </label>
          {errors.email && (
            <span role="alert" className="mkt-2.5 text-xs-regular text-secondary-red-200">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <span className="text-md-regular text-gray-500">비밀번호</span>
          <label
            htmlFor="password"
            className={`${labelStyle} ${errors.password ? 'bg-secondary-red-100' : 'bg-gray-100'}`}
          >
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              className="w-full"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
                pattern: {
                  value: /^.{8,}$/,
                  message: '8자 이상 입력해주세요.',
                },
              })}
              aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
            />
          </label>
          {errors.password && (
            <span role="alert" className="mkt-2.5 text-xs-regular text-secondary-red-200">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2.25 px-3.75 rounded-[10px] bg-primary-green-200 text-md-semibold text-gray-100 mt-2"
        >
          로그인
        </button>
      </form>
      <Link href="/signup" className="text-primary-green-200 text-md-regular mt-10">
        회원가입
      </Link>
    </div>
  );
}
