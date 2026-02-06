import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  initialTime: number; // 초 단위 (예: 300 = 5분)
  onTimeEnd?: () => void; // 타이머 종료 시 콜백
}

/**
 * 타이머 훅 (위키 수정 5분 제한용)
 * @example
 * const { timeLeft, isRunning, start, pause, reset, formatTime } = useTimer({
 *   initialTime: 300, // 5분
 *   onTimeEnd: () => alert('시간 종료!')
 * });
 */
export function useTimer({ initialTime, onTimeEnd }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 정리
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 타이머 시작
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  // 타이머 일시정지
  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  // 타이머 리셋
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    clearTimer();
  }, [initialTime, clearTimer]);

  // 시간 포맷 (MM:SS)
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // 타이머 로직
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            onTimeEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearTimer();
  }, [isRunning, timeLeft, onTimeEnd, clearTimer]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    formatTime: () => formatTime(timeLeft),
  };
}

export default useTimer;
