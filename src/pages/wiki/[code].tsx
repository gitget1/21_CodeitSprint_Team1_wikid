import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

import { useAuthStore } from '@/stores/auth.store';
import { getProfile, getProfilePing } from '@/api/wiki.api';
import { copyWikiLink } from '@/utils/copyToClipboard';
import { isValidImage } from '@/utils/wiki.utils';
import { useSnackbar } from '@/components/ui/Snackbar/Snackbar';
import type { Profile } from '@/types/wiki.types';
import { WikiPageLoading, WikiPageError, WikiPageView } from '@/components/wiki';
import { useWikiEditor } from '@/hooks/useWikiEditor';
import { useWikiProfileEdit } from '@/hooks/useWikiProfileEdit';

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

const emptySubscribe = () => () => {};

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
  const setProfileImageUrl = useAuthStore((s) => s.setProfileImageUrl);

  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [loading, setLoading] = useState(!initialProfile);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useSnackbar();

  const profileEdit = useWikiProfileEdit({
    code,
    profile,
    setProfile,
    isMyWiki: isClient && isLoggedIn && user?.name === profile?.name,
    setProfileImageUrl,
    showSnackbar,
  });

  const updateContent = useCallback(
    (html: string) => profileEdit.updateField('content', html),
    [profileEdit]
  );

  const {
    editorContentRef,
    editorImageInputRef,
    runEditorCommand,
    saveEditorSelection,
    handleEditorImageSelect,
    handleEditorVideoInsert,
  } = useWikiEditor({
    updateContent,
    showSnackbar,
  });

  const isMyWiki = isClient && isLoggedIn && user?.name === profile?.name;
  const hasContent = Boolean(profile?.content?.trim());

  useEffect(() => {
    if (initialProfile || !code) return;
    let cancelled = false;
    queueMicrotask(() => setLoading(true));
    getProfile(code)
      .then((p) => {
        if (!cancelled) setProfile(p);
      })
      .catch(() => {
        if (!cancelled) setError('프로필을 불러올 수 없습니다.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code, initialProfile]);

  useEffect(() => {
    if (profile && isMyWiki && !profileEdit.isEditMode && isValidImage(profile.image)) {
      setProfileImageUrl(profile.image);
    }
  }, [profile, isMyWiki, profileEdit.isEditMode, setProfileImageUrl]);

  useEffect(() => {
    if (profileEdit.isEditMode && editorContentRef.current) {
      editorContentRef.current.innerHTML = profileEdit.editForm.content ?? '';
    }
  }, [profileEdit.isEditMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartEdit = useCallback(async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    if (!code) return;
    try {
      const pingData = await getProfilePing(code);
      if (pingData != null) {
        showSnackbar('편집 중입니다. 앞 사람의 편집이 끝나면 위키 참여가 가능합니다.', 'info');
        return;
      }
    } catch {
      showSnackbar('편집 상태를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.', 'error');
      return;
    }
    profileEdit.handleStartEdit();
  }, [isLoggedIn, router, profileEdit, code, showSnackbar]);

  const handleCopyLink = useCallback(async () => {
    if (!code) return;
    const ok = await copyWikiLink(code);
    if (ok) showSnackbar('링크가 복사되었습니다.', 'success');
  }, [code, showSnackbar]);

  const handleTimeoutConfirm = useCallback(() => {
    profileEdit.setIsTimeoutOpen(false);
  }, [profileEdit]);

  if (loading) return <WikiPageLoading />;
  if (error || !profile) {
    return <WikiPageError error={error} onGoToList={() => router.push('/wikilist')} />;
  }

  return (
    <WikiPageView
      profile={profile}
      code={code}
      isClient={isClient}
      isMyWiki={isMyWiki}
      hasContent={hasContent}
      profileEdit={profileEdit}
      editorContentRef={editorContentRef}
      editorImageInputRef={editorImageInputRef}
      runEditorCommand={runEditorCommand}
      saveEditorSelection={saveEditorSelection}
      onEditorImageSelect={handleEditorImageSelect}
      onEditorVideoInsert={handleEditorVideoInsert}
      onStartEdit={handleStartEdit}
      onCopyLink={handleCopyLink}
      onTimeoutConfirm={handleTimeoutConfirm}
    />
  );
}
