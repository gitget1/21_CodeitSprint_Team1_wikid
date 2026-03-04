import { useState } from 'react';

import ProfileIcon from '@/assets/icons/Profile.svg';
import useComment from '@/hooks/useComment';
import { useAuthStore } from '@/stores/auth.store';
import DeleteIcon from '@/assets/icons/Delete.svg';
import EditIcon from '@/assets/icons/Edit.svg';
import { Comment } from '@/types/comment.types';
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

import Button from '../Button/Button';
interface Props {
  comment: Comment;
}
export default function CommentCard({ comment }: Props) {
  const { isLoggedIn, user } = useAuthStore();
  const myId = user?.id;
  const isMine = isLoggedIn && myId === comment.writer.id;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const { patchComment, removeComment } = useComment();
  const MAX = 500;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await removeComment(comment.id);
      setDeleteDialogOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div className="flex px-5 py-5 rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]">
      <div>
        {comment.writer?.image ? (
          <img
            src={comment.writer.image}
            alt="profile"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        ) : (
          <ProfileIcon className="w-[50px] h-[50px] text-gray-300" />
        )}
      </div>
      <div className="w-full pl-5">
        <div className=" flex justify-between">
          <div className="font-semibold text-[18px] text-[rgb(71_77_102)]">
            {comment.writer?.name}
          </div>
          {isMine && (
            <div className="flex gap-4 text-gray-300">
              <button
                className=" hover:text-gray-500"
                onClick={() => {
                  setEditingId(comment.id);
                  setEditingContent(comment.content);
                }}
              >
                <EditIcon className="w-5 h-5 " />
              </button>
              <button className="hover:text-red-400" onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        {editingId === comment.id ? (
          <div className="pt-2">
            <textarea
              className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-[14px] outline-none"
              value={editingContent}
              maxLength={MAX}
              onChange={(e) => setEditingContent(e.target.value)}
            />

            <div className="mt-2 flex justify-between items-center">
              <div className="text-[12px] text-[rgb(198_202_218)]">
                {editingContent.length} / {MAX}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null);
                    setEditingContent('');
                  }}
                >
                  취소
                </Button>

                <Button
                  variant="primary"
                  disabled={!editingContent.trim()}
                  onClick={async () => {
                    await patchComment(comment.id, editingContent.trim());
                    setEditingId(null);
                    setEditingContent('');
                  }}
                >
                  저장
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[16px]text-[rgb(71_77_102)] pt-2">{comment.content}</div>
        )}

        <div className="text-[14px] text-[rgb(143_149_178)] pt-2">
          {comment.createdAt?.slice(0, 10)}
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제 확인</AlertDialogTitle>
            <AlertDialogDescription>댓글을 삭제하시겠습니까?</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary" disabled={deleteLoading}>
                취소
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete} disabled={deleteLoading}>
              삭제하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
