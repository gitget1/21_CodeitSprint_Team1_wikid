import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/auth.store';
import useSignIn from '@/hooks/useSignIn';
import Button from "@/components/ui/Button/Button";
import FormInput from '@/components/common/FormInput';
import { loginSchema, type LoginForm } from '@/utils/validators';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const signIn = useSignIn();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    } else {
      setIsLoaded(true);
    }
  },[isLoggedIn, router]);

  if (!isLoaded || isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div> 
  )};

  return (
    <div className="flex flex-col items-center m-auto my-15">
      <h1 className="text-2xl-semibold text-gray-500">로그인</h1>
      <form
        noValidate
        className="w-84 md:w-100 flex flex-col gap-6 mt-12.5"
        onSubmit={handleSubmit((data) => signIn.mutate(data))}
      >
        <FormInput
          label="이메일"
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
