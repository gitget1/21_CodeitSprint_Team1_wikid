import Head from 'next/head';
import type { RefObject } from 'react';

import { QuizModal, ConfirmModal } from '@/components/ui/Modal/Modal';
import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';
import { WikiContentArea, WikiNameAndLink, WikiProfileSidebar } from '@/components/wiki';

/** 페이지에서 전달하는 profileEdit 객체의 필요한 필드 */
export interface WikiPageProfileEditProps {
  isEditMode: boolean;
  editForm: UpdateProfileRequest;
  updateField: (key: string, value: string) => void;
  handleStartEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  handleQuizSubmit: (answer: string) => void;
  quizError: string;
  quizLoading: boolean;
  isTimeoutOpen: boolean;
  setIsTimeoutOpen: (open: boolean) => void;
  profileImageInputRef: RefObject<HTMLInputElement | null>;
  previewDataUrl: string | null;
  showProfileImage: (url: string | undefined | null) => boolean;
  markProfileImageFailed: (url: string) => void;
  handleProfileImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface WikiPageViewProps {
  profile: Profile;
  code: string;
  isClient: boolean;
  isMyWiki: boolean;
  hasContent: boolean;
  profileEdit: WikiPageProfileEditProps;
  editorContentRef: RefObject<HTMLDivElement | null>;
  editorImageInputRef: RefObject<HTMLInputElement | null>;
  runEditorCommand: (fn: () => void) => void;
  saveEditorSelection: () => void;
  onEditorImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditorVideoInsert: () => void;
  onStartEdit: () => void;
  onCopyLink: () => void;
  onTimeoutConfirm: () => void;
}

export function WikiPageView({
  profile,
  code,
  isClient,
  isMyWiki,
  hasContent,
  profileEdit,
  editorContentRef,
  editorImageInputRef,
  runEditorCommand,
  saveEditorSelection,
  onEditorImageSelect,
  onEditorVideoInsert,
  onStartEdit,
  onCopyLink,
  onTimeoutConfirm,
}: WikiPageViewProps) {
  const wikiUrl = `/wiki/${code}`;
  const pageTitle = profileEdit.isEditMode ? '내 위키 페이지 - 수정 진행중' : '내 위키 페이지';
  const linkDisplayText = isClient
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}${wikiUrl}`
    : wikiUrl;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="mx-auto flex min-w-0 w-full gap-10 px-6 py-10 max-[744px]:max-w-[744px] max-[744px]:flex-col max-[744px]:gap-6 max-[375px]:px-4 max-[375px]:py-6 max-[375px]:gap-6 overflow-x-hidden">
        <div className="min-w-0 flex-1 max-[744px]:contents min-[745px]:flex min-[745px]:flex-col min-[745px]:items-center">
          <div
            className={`min-w-0 max-w-full max-[744px]:contents max-[744px]:w-full min-[745px]:flex min-[745px]:flex-col ${profileEdit.isEditMode ? 'min-[745px]:w-[1120px]' : 'min-[745px]:w-[860px]'}`}
          >
            {!profileEdit.isEditMode && (
              <div className="max-[744px]:order-0 min-w-0 max-w-full">
                <WikiNameAndLink
                  name={profile.name}
                  linkDisplayText={linkDisplayText}
                  onCopyLink={onCopyLink}
                  actionSlot={
                    hasContent ? (
                      <button
                        type="button"
                        onClick={onStartEdit}
                        className="flex h-[45px] min-h-[45px] w-[160px] min-w-[160px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] bg-primary-green-200 px-10 py-[13px] text-sm font-semibold text-white hover:bg-primary-green-300"
                      >
                        위키 참여하기
                      </button>
                    ) : null
                  }
                />
              </div>
            )}

            <div className="max-[744px]:order-2 min-w-0 max-w-full">
              <div className="mt-6 min-w-0 max-w-full">
                <WikiContentArea
                  isEditMode={profileEdit.isEditMode}
                  hasContent={hasContent}
                  profile={profile}
                  editForm={profileEdit.editForm}
                  editorContentRef={editorContentRef}
                  editorImageInputRef={editorImageInputRef}
                  updateField={profileEdit.updateField}
                  runEditorCommand={runEditorCommand}
                  saveEditorSelection={saveEditorSelection}
                  onEditorImageSelect={onEditorImageSelect}
                  onEditorVideoInsert={onEditorVideoInsert}
                  onStartEdit={onStartEdit}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 max-[744px]:w-full">
          <WikiProfileSidebar
            isEditMode={profileEdit.isEditMode}
            profile={profile}
            editForm={profileEdit.editForm}
            isMyWiki={isMyWiki}
            profileImageInputRef={profileEdit.profileImageInputRef}
            previewDataUrl={profileEdit.previewDataUrl}
            showProfileImage={profileEdit.showProfileImage}
            markProfileImageFailed={profileEdit.markProfileImageFailed}
            updateField={profileEdit.updateField}
            onProfileImageSelect={profileEdit.handleProfileImageSelect}
            onSave={profileEdit.handleSave}
            onCancel={profileEdit.handleCancel}
          />
        </div>
      </div>

      <QuizModal
        isOpen={profileEdit.isQuizOpen}
        onClose={() => profileEdit.setIsQuizOpen(false)}
        question={profile.securityQuestion}
        onSubmit={profileEdit.handleQuizSubmit}
        error={profileEdit.quizError}
        isLoading={profileEdit.quizLoading}
      />

      <ConfirmModal
        isOpen={profileEdit.isTimeoutOpen}
        onClose={() => profileEdit.setIsTimeoutOpen(false)}
        title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
        description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        confirmText="확인"
        onConfirm={onTimeoutConfirm}
      />
    </>
  );
}
