import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Button from "@/components/ui/Button/Button";
import FormInput from '@/components/common/FormInput';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<LoginForm>();

  return (
    <div className="flex flex-col items-center m-auto my-15">
      <h1 className="text-2xl-semibold text-gray-500">로그인</h1>
      <form
        noValidate
        className="w-84 md:w-100 flex flex-col gap-6 mt-12.5"
        onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <FormInput<LoginForm>
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          register={register}
          rules={{
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식으로 작성해주세요.',
            },
          }}
          error={errors.email}
          isSubmitted={isSubmitted}
        />
        <FormInput<LoginForm>
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register}
          rules={{
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^.{8,}$/,
              message: '8자 이상 입력해주세요.',
            },
          }}
          error={errors.password}
          isSubmitted={isSubmitted}
        />
        <Button type="submit" disabled={isSubmitting} fullWidth size="lg" className="mt-2 h-[45px]">
          로그인
        </Button>
      </form>
      <Link href="/signup" className="text-primary-green-200 text-md-regular mt-10">
        회원가입
      </Link>
    </div>
  );
}
