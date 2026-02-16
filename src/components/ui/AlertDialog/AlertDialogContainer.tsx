import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './index';
import { useAlertStore } from '@/stores/alert.store';

export default function AlertDialogContainer() {
  const { isOpen, message, onConfirm, closeAlert } = useAlertStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeAlert();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>알림</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full mt-3">
          <AlertDialogAction onClick={handleConfirm} className="w-full h-[40px]">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
