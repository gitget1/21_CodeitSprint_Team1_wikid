import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';

import { useAuthStore } from '@/stores/auth.store';
import { uploadImage } from '@/api/image.api';
import { getProfile, ping, updateProfile } from '@/api/wiki.api';
import { copyWikiLink } from '@/utils/copyToClipboard';
import { QuizModal, ConfirmModal } from '@/components/ui/Modal/Modal';
import { useSnackbar } from '@/components/ui/Snackbar/Snackbar';
import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';
import {
  isValidImage,
  PING_INTERVAL_MS,
  WikiContentArea,
  WikiNameAndLink,
  WikiProfileSidebar,
} from '@/components/wiki';

/* ── SSR ── */
interface WikiPageProps {
  initialProfile: Profile | null;
  code: string;
}

export const getServerSideProps: GetServerSideProps<WikiPageProps> = async (ctx) => {
  const code = ctx.params?.code as string;
  try {
    const profile = await getProfile(code);
    return { props: { initialProfile: profile, code } };
  } catch {
    return { props: { initialProfile: null, code } };
  }
};

/* ── 하이드레이션 헬퍼 ── */
const emptySubscribe = () => () => {};

/* ══════════════════════════════════════════════ */
export default function WikiPage({ initialProfile, code: codeFromProps }: WikiPageProps) {
  const router = useRouter();
  const code = (router.query.code as string) || codeFromProps;
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [loading, setLoading] = useState(!initialProfile);
  const [error, setError] = useState<string | null>(null);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [quizLoading, setQuizLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<UpdateProfileRequest>({});
  const securityAnswerRef = useRef('');
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  const [isTimeoutOpen, setIsTimeoutOpen] = useState(false);

  const [failedProfileImageUrls, setFailedProfileImageUrls] = useState<Set<string>>(new Set());
  const markProfileImageFailed = useCallback((url: string) => {
    setFailedProfileImageUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }, []);
  const showProfileImage = useCallback(
    (url: string | undefined | null) =>
      Boolean(url && isValidImage(url) && !failedProfileImageUrls.has(url)),
    [failedProfileImageUrls]
  );

  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const setProfileImageUrl = useAuthStore((s) => s.setProfileImageUrl);

  const isMyWiki = isClient && isLoggedIn && user?.name === profile?.name;
  const hasContent = Boolean(profile?.content?.trim());

  useEffect(() => {
    if (initialProfile || !code) return;
    setLoading(true);
    getProfile(code)
      .then(setProfile)
      .catch(() => setError('프로필을 불러올 수 없습니다.'))
      .finally(() => setLoading(false));
  }, [code, initialProfile]);

  useEffect(() => {
    if (profile && isMyWiki && isValidImage(profile.image)) {
      setProfileImageUrl(profile.image);
    }
  }, [profile, isMyWiki, setProfileImageUrl]);

  useEffect(() => {
    if (!isEditMode) setPreviewDataUrl(null);
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode && editorContentRef.current) {
      editorContentRef.current.innerHTML = editForm.content ?? '';
    }
  }, [isEditMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuizSubmit = useCallback(
    async (answer: string) => {
      if (!code) return;
      setQuizLoading(true);
      setQuizError('');
      try {
        await ping(code, answer);
        securityAnswerRef.current = answer;
        setIsQuizOpen(false);
        if (profile) {
          setEditForm({
            content: profile.content ?? '',
            city: profile.city ?? '',
            mbti: profile.mbti ?? '',
            job: profile.job ?? '',
            sns: profile.sns ?? '',
            birthday: profile.birthday ?? '',
            nickname: profile.nickname ?? '',
            bloodType: profile.bloodType ?? '',
            nationality: profile.nationality ?? '',
            image: profile.image ?? '',
          });
        }
        setIsEditMode(true);
      } catch {
        setQuizError('퀴즈 정답이 아닙니다.');
      } finally {
        setQuizLoading(false);
      }
    },
    [code, profile]
  );

  const handleStartEdit = useCallback(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setQuizError('');
    setIsQuizOpen(true);
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isEditMode || !code) return;
    const doPing = async () => {
      try {
        await ping(code, securityAnswerRef.current);
      } catch {
        setIsTimeoutOpen(true);
        setIsEditMode(false);
      }
    };
    pingIntervalRef.current = setInterval(doPing, PING_INTERVAL_MS);
    const timeout = setTimeout(
      () => {
        setIsTimeoutOpen(true);
        setIsEditMode(false);
      },
      5 * 60 * 1000
    );
    return () => {
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      clearTimeout(timeout);
    };
  }, [isEditMode, code]);

  const { showSnackbar } = useSnackbar();

  const handleSave = useCallback(async () => {
    if (!code) return;
    try {
      const updated = await updateProfile(code, {
        ...editForm,
        securityAnswer: securityAnswerRef.current,
      });
      setProfile(updated);
      setIsEditMode(false);
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (isMyWiki && isValidImage(updated.image)) {
        setProfileImageUrl(updated.image);
      }
      showSnackbar('위키가 수정되었습니다.', 'success');
    } catch {
      showSnackbar('저장에 실패했습니다.', 'error');
    }
  }, [code, editForm, showSnackbar, isMyWiki, setProfileImageUrl]);

  const handleCancel = useCallback(() => {
    setIsEditMode(false);
    if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
  }, []);

  const handleCopyLink = useCallback(async () => {
    if (!code) return;
    const ok = await copyWikiLink(code);
    if (ok) showSnackbar('링크가 복사되었습니다.', 'success');
  }, [code, showSnackbar]);

  const updateField = useCallback((key: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveEditorSelection = useCallback(() => {
    const sel = document.getSelection();
    const el = editorContentRef.current;
    if (!el || !sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (el.contains(range.commonAncestorContainer)) savedSelectionRef.current = range.cloneRange();
  }, []);

  const runEditorCommand = useCallback(
    (fn: () => void) => {
      const el = editorContentRef.current;
      if (!el) return;
      el.focus();
      const sel = document.getSelection();
      if (sel && savedSelectionRef.current) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRef.current);
      }
      fn();
      updateField('content', el.innerHTML);
    },
    [updateField]
  );

  const handleEditorImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) {
        if (file) showSnackbar('이미지 파일만 선택할 수 있습니다.', 'error');
        e.target.value = '';
        return;
      }
      try {
        const { url } = await uploadImage(file);
        if (!url) {
          showSnackbar('이미지 URL을 받지 못했습니다.', 'error');
          e.target.value = '';
          return;
        }
        runEditorCommand(() => {
          document.execCommand(
            'insertHTML',
            false,
            `<img src="${url}" alt="" style="max-width:100%;height:auto;" />`
          );
        });
        showSnackbar('이미지가 삽입되었습니다.', 'success');
      } catch {
        showSnackbar('이미지 업로드에 실패했습니다. (최대 5MB)', 'error');
      }
      e.target.value = '';
    },
    [runEditorCommand, showSnackbar]
  );

  const handleEditorVideoInsert = useCallback(() => {
    const url = window.prompt('동영상 URL을 입력하세요 (YouTube 등)');
    if (!url?.trim()) return;
    let embedUrl = url.trim();
    const ytMatch = embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    runEditorCommand(() => {
      document.execCommand(
        'insertHTML',
        false,
        `<div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe></div>`
      );
    });
    showSnackbar('동영상이 삽입되었습니다.', 'success');
  }, [runEditorCommand, showSnackbar]);

  const handleProfileImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showSnackbar('이미지 파일만 선택할 수 있습니다.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && typeof ev.target.result === 'string') {
          setPreviewDataUrl(ev.target.result);
        }
      };
      reader.readAsDataURL(file);
      try {
        const { url } = await uploadImage(file);
        if (url) {
          updateField('image', url);
          setProfileImageUrl(url);
          setPreviewDataUrl(null);
          showSnackbar('프로필 이미지가 변경되었습니다.', 'success');
        } else {
          showSnackbar('서버에서 이미지 주소를 받지 못했습니다.', 'error');
        }
      } catch {
        setPreviewDataUrl(null);
        showSnackbar('이미지 업로드에 실패했습니다. (최대 5MB)', 'error');
      }
      e.target.value = '';
    },
    [updateField, showSnackbar, setProfileImageUrl]
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-gray-400">{error ?? '프로필을 찾을 수 없습니다.'}</p>
        <button
          type="button"
          onClick={() => router.push('/wikilist')}
          className="rounded-[10px] bg-primary-green-200 px-6 py-2 text-sm font-semibold text-white"
        >
          위키 목록으로
        </button>
      </div>
    );
  }

  const wikiUrl = `/wiki/${code}`;
  const pageTitle = isEditMode ? '내 위키 페이지 - 수정 진행중' : '내 위키 페이지';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="mx-auto flex min-w-0 w-full gap-10 px-6 py-10 max-[744px]:max-w-[744px] max-[744px]:flex-col max-[744px]:gap-6 max-[375px]:px-4 max-[375px]:py-6 max-[375px]:gap-6 overflow-x-hidden">
        <div className="min-w-0 flex-1 max-[744px]:contents min-[745px]:flex min-[745px]:flex-col min-[745px]:items-center">
          <div
            className={`min-w-0 max-w-full max-[744px]:contents max-[744px]:w-full min-[745px]:flex min-[745px]:flex-col ${isEditMode ? 'min-[745px]:w-[1120px]' : 'min-[745px]:w-[860px]'}`}
          >
            {!isEditMode && (
              <div className="max-[744px]:order-0 min-w-0 max-w-full">
                <WikiNameAndLink
                  name={profile.name}
                  linkDisplayText={isClient ? `${window.location.origin}${wikiUrl}` : wikiUrl}
                  onCopyLink={handleCopyLink}
                  actionSlot={
                    hasContent ? (
                      <button
                        type="button"
                        onClick={handleStartEdit}
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
                  isEditMode={isEditMode}
                  hasContent={hasContent}
                  profile={profile}
                  editForm={editForm}
                  editorContentRef={editorContentRef}
                  editorImageInputRef={editorImageInputRef}
                  updateField={updateField}
                  runEditorCommand={runEditorCommand}
                  saveEditorSelection={saveEditorSelection}
                  onEditorImageSelect={handleEditorImageSelect}
                  onEditorVideoInsert={handleEditorVideoInsert}
                  onStartEdit={handleStartEdit}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 max-[744px]:w-full">
          <WikiProfileSidebar
            isEditMode={isEditMode}
            profile={profile}
            editForm={editForm}
            isMyWiki={isMyWiki}
            profileImageInputRef={profileImageInputRef}
            previewDataUrl={previewDataUrl}
            showProfileImage={showProfileImage}
            markProfileImageFailed={markProfileImageFailed}
            updateField={updateField}
            onProfileImageSelect={handleProfileImageSelect}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>

      {profile && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          question={profile.securityQuestion}
          onSubmit={handleQuizSubmit}
          error={quizError}
          isLoading={quizLoading}
        />
      )}

      <ConfirmModal
        isOpen={isTimeoutOpen}
        onClose={() => setIsTimeoutOpen(false)}
        title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
        description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        confirmText="확인"
        onConfirm={() => setIsTimeoutOpen(false)}
      />
    </>
  );
}
