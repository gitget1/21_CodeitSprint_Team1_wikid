import { useRequireAuth } from '@/hooks/useRequireAuth';
import FormSection from '@/components/common/FormSection';

export default function MyPage() {
  const { isLoading } = useRequireAuth();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('비밀번호 변경 데이터:', data);
  };

  const handleCreateWiki = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('위키 생성 데이터:', data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center m-auto my-35">
      <h1 className="text-2xl-semibold text-gray-500 mb-16">계정 설정</h1>
      <FormSection
        title="비밀번호 변경"
        fields={[
          {
            name: 'currentPassword',
            label: '기존 비밀번호',
            type: 'password',
            placeholder: '기존 비밀번호',
          },
          {
            name: 'password',
            label: '새 비밀번호',
            type: 'password',
            placeholder: '새 비밀번호',
          },
          {
            name: 'passwordConfirmation',
            label: '새 비밀번호 확인',
            type: 'password',
            placeholder: '새 비밀번호 확인',
          },
        ]}
        onSubmit={handleChangePassword}
        submitButtonText="변경하기"
      />
      <hr className="w-full border-gray-200 my-8" />
      <FormSection
        title="위키 생성하기"
        fields={[
          {
            name: 'securityQuestion',
            label: '질문',
            type: 'text',
            placeholder: '질문을 입력해 주세요',
          },
          {
            name: 'securityAnswer',
            label: '답',
            type: 'text',
            placeholder: '답을 입력해 주세요',
          },
        ]}
        onSubmit={handleCreateWiki}
        submitButtonText="생성하기"
      />
    </div>
  );
}
