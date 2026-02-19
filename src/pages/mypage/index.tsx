import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import useChangePassword from '@/hooks/useChangePassword';
import useCreateProfile from '@/hooks/useCreateProfile';
import { useAuthStore } from '@/stores/auth.store';
import { getProfile } from '@/api/wiki.api';
import FormInput from '@/components/common/FormInput';
import Button from '@/components/ui/Button/Button';
import MyPageSkeleton from './MyPageSkeleton';
import { changePasswordSchema, createWikiSchema, type ChangePasswordForm, type CreateWikiForm } from '@/utils/validators';

export default function MyPage() {
  const { isLoading } = useRequireAuth();
  const changePasswordMutation = useChangePassword();
  const createProfileMutation = useCreateProfile();
  const user = useAuthStore((state) => state.user);
  const hasProfile = !!user?.profile?.code;
  const profileCode = user?.profile?.code || '';
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ['profile', profileCode],
    queryFn: () => getProfile(profileCode),
    enabled: hasProfile && !!profileCode,
  });

  useEffect(() => {
    if (!isLoading) {
      setIsLoaded(true);
    }
  }, [isLoading]);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { isSubmitting: isSubmittingPassword, isSubmitted: isSubmittedPassword, errors: errorsPassword },
    reset: resetPassword,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    register: registerWiki,
    handleSubmit: handleSubmitWiki,
    formState: { isSubmitting: isSubmittingWiki, isSubmitted: isSubmittedWiki, errors: errorsWiki },
  } = useForm<CreateWikiForm>({
    resolver: zodResolver(createWikiSchema),
  });

  const handleChangePassword = (data: ChangePasswordForm) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        resetPassword();
      },
    });
  };

  const handleCreateWiki = (data: CreateWikiForm) => {
    createProfileMutation.mutate(data);
  };

  if (isLoading || !isLoaded) {
    return <MyPageSkeleton />;
  }

  return (
    <div className="flex flex-col items-center m-auto my-35">
      <h1 className="text-2xl-semibold text-gray-500 mb-16">계정 설정</h1>
      <form
        onSubmit={handleSubmitPassword(handleChangePassword)}
        className="w-84 md:w-100 flex flex-col gap-4"
      >
        <div>
          <span className="text-md-regular text-gray-500">비밀번호 변경</span>
          <FormInput
            label="기존 비밀번호"
            type="password"
            placeholder="기존 비밀번호"
            error={errorsPassword.currentPassword}
            isSubmitted={isSubmittedPassword}
            showLabel={false}
            autoComplete="current-password"
            {...registerPassword('currentPassword')}
          />
          <FormInput
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호"
            error={errorsPassword.password}
            isSubmitted={isSubmittedPassword}
            showLabel={false}
            autoComplete="new-password"
            {...registerPassword('password')}
          />
          <FormInput
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 확인"
            error={errorsPassword.passwordConfirmation}
            isSubmitted={isSubmittedPassword}
            showLabel={false}
            autoComplete="new-password"
            {...registerPassword('passwordConfirmation')}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmittingPassword || changePasswordMutation.isPending} 
            className="w-[89px] !min-w-0 px-5 h-[40px]"
          >
            변경하기
          </Button>
        </div>
      </form>
      <hr className="w-full border-gray-200 my-8" />
      <form
        onSubmit={handleSubmitWiki(handleCreateWiki)}
        className="w-84 md:w-100 flex flex-col gap-4"
      >
        <div>
          <span className="text-md-regular text-gray-500">위키 생성하기</span>
          <FormInput
            label="질문"
            placeholder={hasProfile && profileData?.securityQuestion ? `질문 : ${profileData.securityQuestion}` : '질문을 입력해 주세요'}
            error={errorsWiki.securityQuestion}
            isSubmitted={isSubmittedWiki}
            showLabel={false}
            disabled={hasProfile}
            {...registerWiki('securityQuestion')}
          />
          <FormInput
            label="답"
            placeholder={hasProfile ? `답 : 보안상으로 미공개` : '답을 입력해 주세요'}
            error={errorsWiki.securityAnswer}
            isSubmitted={isSubmittedWiki}
            showLabel={false}
            disabled={hasProfile}
            {...registerWiki('securityAnswer')}
          />
          {hasProfile && (
            <p className="text-md-regular text-primary-green-300 mt-[10px]">위키가 이미 생성되었습니다</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={hasProfile || isSubmittingWiki || createProfileMutation.isPending} 
            className="w-[89px] !min-w-0 px-5 h-[40px]"
          >
            생성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
