import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useArticles from '@/hooks/useBoard';
import { useArticleStore } from '@/stores/boards.store';
import DeleteIcon from '@/assets/icons/Delete.svg';
import EditIcon from '@/assets/icons/Edit.svg';
import LikesIcon from '@/assets/icons/ic_heart.svg';
import Button from '@/components/ui/Button/Button';
import useComment from '@/hooks/useComment';
import { useCommentStore } from '@/stores/comment.store';
import { useAuthStore } from '@/stores/auth.store';
import CommentCard from '@/components/ui/Comment/CommentCard';
import ImageIcon from '@/assets/icons/ic_image.svg';
import { ImageInsertModal } from '@/components/ui/Modal/Modal';
import { uploadImage } from '@/api/image.api';
import BoardDetailSkeleton from '@/components/ui/Skeleton/BoardDetailSkeleton';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/AlertDialog/AlertDialog';
import PostEditorToolbar from '@/components/ui/Texteditor/PostEditorToolbar';
export default function BoardDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;
  const id = typeof boardId === 'string' ? Number(boardId) : NaN;
  const { fetchArticle, patchArticle, removeArticle, doLike, undoLike } = useArticles();
  const { fetchComment, postComment } = useComment();
  const { article, isLoading, error } = useArticleStore();
  const { comment } = useCommentStore();
  const [content, setContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const MAX = 500;
  const { isLoggedIn, user } = useAuthStore();
  type DialogType = 'login' | 'notOwner' | 'deleteConfirm' | 'uploadFail';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('login');
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [afterAction, setAfterAction] = useState<null | (() => void)>(null);
  const openDialog = (type: DialogType, message: string, onConfirm?: () => void) => {
    setDialogType(type);
    setDialogMessage(message);
    setAfterAction(() => onConfirm ?? null);
    setDialogOpen(true);
  };
  const isLiked =
    typeof article === 'object' &&
    article !== null &&
    'isLiked' in article &&
    typeof (article as { isLiked?: unknown }).isLiked === 'boolean'
      ? article.isLiked
      : false;
  const handleToggleLike = async () => {
    if (!article) return;

    if (!isLoggedIn) {
      openDialog('login', '로그인 후 이용할 수 있어요.', () => router.push('/login'));
      return;
    }

    if (isLiked) {
      await undoLike(article.id);
    } else {
      await doLike(article.id);
    }

    await fetchArticle(article.id);
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (!Number.isFinite(id)) return;

    fetchArticle(id);
    fetchComment(id, { limit: 20 });
  }, [router.isReady, id, fetchArticle, fetchComment]);
  useEffect(() => {
    if (!article) return;
    setEditTitle(article.title ?? '');
    setEditContent(article.content ?? '');
    setEditImage(article.image ?? '');
    setPreviewImage(article.image ?? '');

    lastSyncedHtmlRef.current = article.content ?? '';
    if (editorRef.current) editorRef.current.innerHTML = article.content ?? '';
  }, [article]);
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const isFocused = typeof document !== 'undefined' && document.activeElement === el;

    if (!isFocused && editContent !== lastSyncedHtmlRef.current) {
      el.innerHTML = editContent || '';
      lastSyncedHtmlRef.current = editContent || '';
    }
  }, [editContent]);
  const moveList = () => {
    router.push('/boards');
  };
  const handleSave = async () => {
    if (!article) return;

    if (!editTitle.trim()) return;

    const updated = await patchArticle(article.id, {
      title: editTitle.trim(),
      content: editContent.trim(),
      image: editImage,
    });

    if (updated) {
      await fetchArticle(article.id);
      setIsEditing(false);
    }
  };
  const handleInsertImage = async (file: File | null) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const safeName = `board_${Date.now()}.${ext}`;

      const safeFile = new File([file], safeName, { type: file.type });

      const res = await uploadImage(safeFile);

      setEditImage(res.url);
      setPreviewImage(res.url);
    } catch (e) {
      const message = e instanceof Error ? e.message : '이미지 업로드 실패';
      openDialog('uploadFail', message);
    } finally {
      URL.revokeObjectURL(preview);
    }
  };
  const guardOwner = () => {
    if (!isLoggedIn) {
      openDialog('login', '로그인 후 이용할 수 있어요.', () => router.push('/login'));
      return false;
    }

    if (!article || article.writer?.id !== user?.id) {
      openDialog('notOwner', '작성자만 수정/삭제할 수 있어요.');
      return false;
    }

    return true;
  };
  const cover = article?.image ?? '';
  const rawHtml = article?.content ?? '';

  const contentHtml = cover
    ? rawHtml.replaceAll(
        new RegExp(
          `<img[^>]*src=["']${cover.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`,
          'g'
        ),
        ''
      )
    : rawHtml;
  const editorRef = useRef<HTMLDivElement | null>(null);
  const lastSyncedHtmlRef = useRef<string>('');
  const handleEditorInput = () => {
    const html = editorRef.current?.innerHTML ?? '';
    lastSyncedHtmlRef.current = html;
    setEditContent(html);
  };

  const runEditorCommand = (fn: () => void) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    fn();
    handleEditorInput();
  };
  useLayoutEffect(() => {
    if (!isEditing) return;
    const el = editorRef.current;
    if (!el) return;

    el.innerHTML = editContent || '';
    lastSyncedHtmlRef.current = editContent || '';
  }, [isEditing]);
  if (isLoading) return <BoardDetailSkeleton />;
  if (error) return <div>{error}</div>;
  return (
    <div className="w-full mx-auto max-w-4xl px-4 py-8">
      <div className=" px-[30px] border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[10px]">
        <div className="flex justify-between pt-[40px]">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[20px] font-semibold outline-none focus:border-[rgb(76_191_164)]"
              placeholder="제목을 입력하세요"
            />
          ) : (
            <div className="font-semibold text-[32px]">{article?.title}</div>
          )}
          {!isEditing && (
            <div className="flex gap-2 md:hidden">
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => {
                  if (!guardOwner()) return;
                  setIsEditing(true);
                }}
              >
                <EditIcon className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={async () => {
                  if (!guardOwner()) return;
                  openDialog('deleteConfirm', '정말 삭제할까요?', async () => {
                    const ok = await removeArticle(article!.id);
                    if (ok) router.push('/boards');
                  });
                }}
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          {isEditing ? (
            <div className="flex  gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(article?.title ?? '');
                  setEditContent(article?.content ?? '');
                  setEditImage(article?.image ?? '');
                  setPreviewImage(article?.image ?? '');
                }}
              >
                취소
              </Button>
              <Button variant="primary" onClick={handleSave}>
                저장하기
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  if (!guardOwner()) return;
                  setIsEditing(true);
                }}
              >
                수정하기
              </Button>
              <Button
                variant="primary"
                onClick={async () => {
                  if (!guardOwner()) return;
                  openDialog('deleteConfirm', '정말 삭제할까요?', async () => {
                    const ok = await removeArticle(article!.id);
                    if (ok) router.push('/boards');
                  });
                }}
              >
                삭제하기
              </Button>
            </div>
          )}
        </div>
        <div className="flex pt-[21px] justify-between pb-4 border-b border-[rgb(228_229_240)] lg:border-0 lg:pb-0">
          <div className=" flex font-pretendard text-[14px]  text-[rgb(143_149_178)] gap-2">
            <div> {article?.writer.name}</div>
            <div> {article?.createdAt.slice(0, 10)}</div>
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={handleToggleLike} className="flex items-center gap-1">
              <LikesIcon className={isLiked ? 'opacity-100' : 'opacity-40'} />
              <div className="font-pretendard text-[14px] text-[rgb(143_149_178)]">
                {article?.likeCount}
              </div>
            </button>
          </div>
        </div>
        <div className="pt-[36px]">
          <img
            src={
              isEditing
                ? previewImage || 'https://placehold.co/600x400?text=No+Image'
                : article?.image || 'https://placehold.co/600x400?text=No+Image'
            }
            onError={(e) => {
              console.log('img error src:', (e.target as HTMLImageElement).src);
            }}
            className="w-max-[500px] h-[300px]"
            alt=""
          />

          {isEditing && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[rgb(71_77_102)] hover:bg-gray-50"
              >
                <ImageIcon className="w-5 h-5" />
                이미지 변경
              </button>

              {editImage && (
                <button
                  type="button"
                  onClick={() => {
                    setEditImage('');
                    setPreviewImage('');
                  }}
                  className="text-sm text-[rgb(143_149_178)] hover:text-red-400"
                >
                  이미지 제거
                </button>
              )}
            </div>
          )}
        </div>

        <ImageInsertModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          onInsert={handleInsertImage}
          size="wide"
        />
        {isEditing ? (
          <div className="mt-4">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              onBlur={handleEditorInput}
              className="w-full min-h-[160px] rounded-lg  bg-white p-3 text-[14px] outline-none focus:border-[rgb(76_191_164)]
               whitespace-pre-wrap break-words
               [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
               [&_img]:max-w-full [&_img]:h-auto"
            />
            <PostEditorToolbar
              onImageClick={() => setIsImageModalOpen(true)}
              runEditorCommand={runEditorCommand}
              onToolbarChange={() => {}}
            />
          </div>
        ) : (
          <div
            className="font-pretendard text-[16px] text-[rgb(71_77_102)] pt-[20px] pb-[30px] break-words"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}
      </div>
      <div className="flex justify-center mt-[60px]">
        <Button variant="secondary" onClick={moveList}>
          목록으로
        </Button>
      </div>
      <div className="flex font-semibold text-[18px] gap-1 mt-[60px]">
        <div className="text-[rgb(71_77_102)]">댓글 </div>
        <div className="text-[rgb(76_191_164)]">{comment?.list?.length ?? 0}</div>
      </div>
      <div className="flex flex-col justify-between  w-full h-[133px] rounded-[10px] bg-[rgb(247_247_250)] px-3 py-3 mt-[14px] ">
        <textarea
          className="w-full resize-none text-[14px]  bg-transparent disabled:opacity-50"
          placeholder={isLoggedIn ? '댓글을 입력해 주세요' : '로그인 후 댓글을 작성할 수 있어요'}
          value={content}
          maxLength={MAX}
          disabled={!isLoggedIn}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className=" flex items-end justify-between">
          <div className="font-pretendard text-[14px] text-[rgb(198_202_218)]">
            {content.length} / {MAX}
          </div>
          <Button
            onClick={async () => {
              if (!isLoggedIn) {
                router.push('/login');
                return;
              }
              if (!content.trim()) return;

              await postComment(id, content.trim());
              setContent('');
            }}
            disabled={!isLoggedIn || !content.trim()}
          >
            댓글 등록
          </Button>
        </div>
      </div>

      <div className="mt-[30px]  lg:mt-[60px] flex flex-col gap-5">
        {comment?.list?.map((c) => (
          <CommentCard key={c.id} comment={c} />
        ))}
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === 'deleteConfirm'
                ? '삭제 확인'
                : dialogType === 'login'
                  ? '로그인이 필요해요'
                  : dialogType === 'notOwner'
                    ? '권한이 없어요'
                    : '알림'}
            </AlertDialogTitle>

            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            {dialogType === 'deleteConfirm' ? (
              <>
                <AlertDialogCancel asChild>
                  <Button variant="secondary">취소</Button>
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={async () => {
                    if (!afterAction) return;
                    await afterAction();
                  }}
                >
                  삭제하기
                </AlertDialogAction>
              </>
            ) : dialogType === 'login' ? (
              <>
                <AlertDialogCancel asChild>
                  <Button variant="secondary">취소</Button>
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={async () => {
                    if (!afterAction) return;
                    await afterAction();
                  }}
                >
                  로그인 하러가기
                </AlertDialogAction>
              </>
            ) : (
              <AlertDialogAction>확인</AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
