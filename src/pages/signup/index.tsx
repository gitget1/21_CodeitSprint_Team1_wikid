import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useSignUp from '@/hooks/useSignUp';
import Button from '@/components/ui/Button/Button';
import FormInput from '@/components/common/FormInput';
import { signupSchema, type SignupForm } from '@/utils/validators';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

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
          {...register('name')}
        />
        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email}
          isSubmitted={isSubmitted}
          {...register('email')}
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          isSubmitted={isSubmitted}
          {...register('password')}
        />
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          error={errors.passwordConfirmation}
          isSubmitted={isSubmitted}
          {...register('passwordConfirmation')}
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
