import Link from 'next/link';
import { useForm } from 'react-hook-form';

import useSignUp from '@/hooks/useSignUp';

import Button from "@/components/ui/Button/Button";
import FormInput from '@/components/common/FormInput';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<SignupForm>();

  const signUp = useSignUp();

  return (
    <div className="flex flex-col items-center m-auto my-15">
      <h1 className="text-2xl-semibold text-gray-500">회원가입</h1>
      <form
        noValidate
        className="w-84 md:w-100 flex flex-col gap-6 mt-12.5"
        onSubmit={handleSubmit((data) => signUp.mutate(data))}
      >
        <FormInput
          label="이름"
          placeholder="이름을 입력해주세요"
          error={errors.name}
          isSubmitted={isSubmitted}
          {...register('name', {
            required: '이름은 필수 입력입니다.',
            maxLength: {
              value: 10,
              message: '10자 이하로 입력해주세요.',
            },
          })}
        />
        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email}
          isSubmitted={isSubmitted}
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식으로 작성해주세요.',
            },
          })}
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          isSubmitted={isSubmitted}
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^.{8,}$/,
              message: '8자 이상 입력해주세요.',
            },
          })}
        />
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          error={errors.passwordConfirmation}
          isSubmitted={isSubmitted}
          {...register('passwordConfirmation', {
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <Button type="submit" disabled={isSubmitting} fullWidth size="lg" className="mt-2 h-[45px]">
          가입하기
        </Button>
      </form>
      <Link href="/login" className="text-primary-green-200 text-md-regular mt-10">
        로그인
      </Link>
    </div>
  );
}
