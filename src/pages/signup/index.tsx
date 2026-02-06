import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';

import FormInput from '@/components/common/FormInput';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<SignupForm>();

  const password = watch('password');

  return (
    <div className="flex flex-col items-center m-auto my-15">
      <h1 className="text-2xl-semibold text-gray-500">회원가입</h1>
      <form
        noValidate
        className="w-84 md:w-100 flex flex-col gap-6 mt-12.5"
        onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <FormInput<SignupForm>
          label="이름"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          register={register}
          rules={{
            required: '이름은 필수 입력입니다.',
            maxLength: {
              value: 10,
              message: '10자 이하로 입력해주세요.',
            },
          }}
          error={errors.name}
          isSubmitted={isSubmitted}
        />
        <FormInput<SignupForm>
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
        <FormInput<SignupForm>
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
        <FormInput<SignupForm>
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          register={register}
          rules={{
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
          }}
          error={errors.passwordConfirm}
          isSubmitted={isSubmitted}
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
