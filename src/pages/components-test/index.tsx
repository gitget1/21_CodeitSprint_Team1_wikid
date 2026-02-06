'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Input from '@/components/ui/Input/Input';
import { Modal, ConfirmModal, QuizModal, ImageInsertModal } from '@/components/ui/Modal/Modal';
import { useSnackbar } from '@/components/ui/Snackbar/Snackbar';
import EmptyState from '@/components/common/EmptyState';

import Searchbar from '@/components/ui/SearchBar';
import TextArea from '@/components/ui/Textarea/Textarea';
import { Avatar } from '@/components/common/Avatar';

function ComponentsTestContent() {
  const { showSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [confirmSmallOpen, setConfirmSmallOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [quizSmallOpen, setQuizSmallOpen] = useState(false);
  const [quizSmallError, setQuizSmallError] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalWideOpen, setImageModalWideOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="w-full max-w-[480px] mx-auto px-4 py-8 space-y-12">
      <h1 className="text-2xl font-bold text-gray-600">컴포넌트 테스트</h1>

      {/* Button */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">Button</h2>

        {/* Primary */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="compact">
            내 위키 만들기
          </Button>
          <Button variant="primary" size="loginWide">
            로그인
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="compact" disabled>
            내 위키 만들기
          </Button>
          <Button variant="primary" size="loginWide" disabled>
            로그인
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="compact">
            내 위키 만들기
          </Button>
          <Button variant="primary" size="loginNarrow">
            로그인
          </Button>
        </div>

        {/* isLoading (편집 중) */}
        <div className="flex flex-col items-start gap-3">
          <Button variant="primary" size="editing" isLoading>
            편집 중
          </Button>
          <Button variant="primary" size="compact" isLoading>
            편집 중
          </Button>
        </div>

        {/* Secondary */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="compact">
            내 위키 만들기
          </Button>
          <Button variant="secondary" size="loginWide">
            로그인
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="compact">
            내 위키 만들기
          </Button>
          <Button variant="secondary" size="loginNarrow">
            로그인
          </Button>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">Input</h2>
        <Input placeholder="기본 입력" />
        <Input placeholder="에러 상태" error errorMessage="올바른 값을 입력해 주세요." />
        <Input placeholder="성공 상태" success />
      </section>

      {/* SearchBar */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">SearchBar</h2>
        <Searchbar
          id="test-search"
          value={searchValue}
          placeholder="검색어 입력"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </section>

      {/* Dropdown */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">Dropdown</h2>
        <div className="w-[280px]">
          <Dropdown
            placeholder="선택하세요"
            options={[
              { label: '옵션 1', value: '1' },
              { label: '옵션 2', value: '2' },
              { label: '옵션 3', value: '3' },
            ]}
            value={dropdownValue}
            onChange={setDropdownValue}
          />
        </div>
      </section>

      {/* Snackbar */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">Snackbar</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showSnackbar('앞 사람의 편집이 끝나면 위키 참여가 가능합니다.', 'info')}
          >
            Info
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showSnackbar('내 위키 링크가 복사되었습니다.', 'success')}
          >
            Success
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              showSnackbar('다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.', 'error')
            }
          >
            Error
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              showSnackbar('앞 사람의 편집이 끝나면 위키 참여가 가능합니다.', 'info', 'small')
            }
          >
            Info (Small)
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showSnackbar('내 위키 링크가 복사되었습니다.', 'success', 'small')}
          >
            Success (Small)
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              showSnackbar(
                '다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.',
                'error',
                'small'
              )
            }
          >
            Error (Small)
          </Button>
        </div>
      </section>

      {/* Modal */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">Modal</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
            기본 Modal
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setConfirmOpen(true)}>
            Confirm Modal
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setQuizOpen(true)}>
            Quiz Modal
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setImageModalOpen(true)}>
            Image Insert Modal
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setConfirmSmallOpen(true)}>
            Confirm (Small)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setLeaveOpen(true)}>
            페이지 나가기
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setQuizSmallOpen(true)}>
            Quiz (Small)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setImageModalWideOpen(true)}>
            Image Insert (Wide)
          </Button>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <p className="text-gray-600">기본 모달 내용입니다.</p>
        </Modal>

        <ConfirmModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
          description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
          confirmText="확인"
          onConfirm={() => {
            setConfirmOpen(false);
            showSnackbar('확인을 눌렀습니다.', 'success');
          }}
        />

        <QuizModal
          isOpen={quizOpen}
          onClose={() => {
            setQuizOpen(false);
            setQuizError('');
          }}
          question="특별히 싫어하는 음식은?"
          error={quizError}
          onSubmit={(answer) => {
            if (!answer.trim()) {
              setQuizError('정답이 아닙니다. 다시 시도해 주세요.');
              return;
            }
            if (answer !== '마라탕') {
              setQuizError('정답이 아닙니다. 다시 시도해 주세요.');
              return;
            }
            setQuizError('');
            setQuizOpen(false);
            showSnackbar('정답입니다!', 'success');
          }}
        />

        <ImageInsertModal
          isOpen={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          onInsert={(file) => {
            setImageModalOpen(false);
            showSnackbar(file ? `이미지 선택됨: ${file.name}` : '취소', 'info');
          }}
        />

        <ConfirmModal
          isOpen={confirmSmallOpen}
          onClose={() => setConfirmSmallOpen(false)}
          title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
          description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
          confirmText="확인"
          size="small"
          onConfirm={() => {
            setConfirmSmallOpen(false);
            showSnackbar('확인을 눌렀습니다.', 'success');
          }}
        />

        <ConfirmModal
          isOpen={leaveOpen}
          onClose={() => setLeaveOpen(false)}
          title="저장하지 않고 나가시겠어요?"
          description="작성하신 모든 내용이 사라집니다."
          confirmText="페이지 나가기"
          confirmVariant="danger"
          size="small"
          onConfirm={() => {
            setLeaveOpen(false);
            showSnackbar('페이지를 나갔습니다.', 'info');
          }}
        />

        <QuizModal
          isOpen={quizSmallOpen}
          onClose={() => {
            setQuizSmallOpen(false);
            setQuizSmallError('');
          }}
          question="특별히 싫어하는 음식은?"
          error={quizSmallError}
          size="small"
          onSubmit={(answer) => {
            if (!answer.trim() || answer !== '마라탕') {
              setQuizSmallError('정답이 아닙니다. 다시 시도해 주세요.');
              return;
            }
            setQuizSmallError('');
            setQuizSmallOpen(false);
            showSnackbar('정답입니다!', 'success');
          }}
        />

        <ImageInsertModal
          isOpen={imageModalWideOpen}
          onClose={() => setImageModalWideOpen(false)}
          size="wide"
          onInsert={(file) => {
            setImageModalWideOpen(false);
            showSnackbar(file ? `이미지 선택됨: ${file.name}` : '취소', 'info');
          }}
        />
      </section>

      {/* Avatar */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">Avatar</h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="relative w-10 h-10">
            <Avatar size="comment" name="김철수" />
          </div>
          <div className="relative w-[60px] h-[60px]">
            <Avatar size="wikiCard" alt="프로필" />
          </div>
          <div className="relative w-[62px] h-[62px]">
            <Avatar size="wikiDetail" name="A" />
          </div>
        </div>
      </section>

      {/* EmptyState */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">EmptyState</h2>
        <EmptyState keyword="검색어" />
      </section>

      {/* Textarea (PostComposer) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600 border-b pb-2">
          TextArea (게시물 작성)
        </h2>
        <TextArea
          heading="테스트 게시물"
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          submitLabel="등록"
          onCancelClick={() => {
            setTitle('');
            setContent('');
          }}
          onSubmitClick={() => showSnackbar('등록 클릭 (테스트)', 'info')}
        />
      </section>
    </div>
  );
}

export default function ComponentsTestPage() {
  return <ComponentsTestContent />;
}
