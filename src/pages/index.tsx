'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button/Button';
import { Modal, QuizModal, ConfirmModal } from '@/components/ui/Modal/Modal';
import { useSnackbar } from '@/components/ui/Snackbar/Snackbar';

export default function Home() {
  const { showSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [quizError, setQuizError] = useState('');

  const handleQuizSubmit = (answer: string) => {
    if (answer === '마라탕') {
      setQuizError('');
      setIsQuizModalOpen(false);
      showSnackbar('정답입니다!', 'success');
    } else {
      setQuizError('정답이 아닙니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FA] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-[#474D66]">위키드 UI 컴포넌트</h1>

        {/* Button 섹션 */}
        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-[#474D66]">Button</h2>

          {/* Primary */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-white">Primary</h3>
            <div className="space-y-4">
              {/* 1행: 활성 */}
              <div className="flex items-center gap-4">
                <Button size="sm">내 위키 만들기</Button>
                <Button size="md">로그인</Button>
              </div>
              {/* 2행: 비활성 */}
              <div className="flex items-center gap-4">
                <Button size="sm" disabled>
                  내 위키 만들기
                </Button>
                <Button size="md" disabled>
                  로그인
                </Button>
              </div>
              {/* 3행: 작은 크기 */}
              <div className="flex items-center gap-4">
                <Button size="sm">내 위키 만들기</Button>
                <Button size="sm" className="h-[45px] min-w-[335px]">
                  로그인
                </Button>
              </div>
            </div>
          </div>

          {/* Secondary */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-white">Secondary</h3>
            <div className="space-y-4">
              {/* 1행: 활성 */}
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm">
                  내 위키 만들기
                </Button>
                <Button variant="secondary" size="md">
                  로그인
                </Button>
              </div>
              {/* 2행: 비활성 */}
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm" disabled>
                  내 위키 만들기
                </Button>
                <Button variant="secondary" size="md" disabled>
                  로그인
                </Button>
              </div>
            </div>
          </div>

          {/* Loading */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-white">Loading</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button size="sm" className="h-[45px] min-w-[160px]" isLoading>
                  편집 중
                </Button>
                <Button size="sm" className="h-10 min-w-[110px]" isLoading>
                  편집 중
                </Button>
              </div>
              <div className="flex items-center gap-4"></div>
            </div>
          </div>
        </section>

        {/* Snackbar 섹션 */}
        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-[#474D66]">Snackbar</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              onClick={() => showSnackbar('앞 사람의 편집이 끝나면 위키 참여가 가능합니다.')}
            >
              Info 스낵바
            </Button>
            <Button
              variant="secondary"
              onClick={() => showSnackbar('내 위키 링크가 복사되었습니다.', 'success')}
            >
              Success 스낵바
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showSnackbar('다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.', 'error')
              }
            >
              Error 스낵바
            </Button>
          </div>
        </section>

        {/* Modal 섹션 */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-[#474D66]">Modal</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              기본 모달
            </Button>
            <Button variant="secondary" onClick={() => setIsQuizModalOpen(true)}>
              퀴즈 모달
            </Button>
            <Button variant="secondary" onClick={() => setIsConfirmModalOpen(true)}>
              확인 모달
            </Button>
            <Button variant="secondary" onClick={() => setIsDangerModalOpen(true)}>
              위험 확인 모달
            </Button>
          </div>
        </section>

        {/* 기본 모달 */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="pt-4 text-center">
            <h3 className="mb-2 text-lg font-semibold text-[#474D66]">기본 모달</h3>
            <p className="mb-4 text-sm text-[#8F95B2]">
              이것은 기본 모달 컴포넌트입니다.
              <br />
              자유롭게 내용을 구성할 수 있어요.
            </p>
            <Button fullWidth onClick={() => setIsModalOpen(false)}>
              확인
            </Button>
          </div>
        </Modal>

        {/* 퀴즈 모달 */}
        <QuizModal
          isOpen={isQuizModalOpen}
          onClose={() => {
            setIsQuizModalOpen(false);
            setQuizError('');
          }}
          question="특별히 싫어하는 음식은?"
          onSubmit={handleQuizSubmit}
          error={quizError}
        />

        {/* 확인 모달 */}
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
          description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
          confirmText="확인"
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            showSnackbar('확인되었습니다.', 'success');
          }}
        />

        {/* 위험 확인 모달 */}
        <ConfirmModal
          isOpen={isDangerModalOpen}
          onClose={() => setIsDangerModalOpen(false)}
          title="저장하지 않고 나가시겠어요?"
          description="작성하신 모든 내용이 사라집니다."
          confirmText="페이지 나가기"
          confirmVariant="danger"
          onConfirm={() => {
            setIsDangerModalOpen(false);
            showSnackbar('페이지를 나갔습니다.', 'error');
          }}
        />
      </div>
    </div>
  );
}
