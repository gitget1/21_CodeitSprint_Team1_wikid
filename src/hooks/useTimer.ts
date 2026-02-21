import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  initialTime: number;
  onTimeEnd?: () => void;
}

/**
 * 타이머 훅 (위키 수정 5분 제한용)
 * - start(): 현재 timeLeft부터 카운트다운 시작 (기존 인터벌 자동 정리)
 * - pause(): 일시정지
 * - reset(): timeLeft를 initialTime으로 되돌리고 정지
 * - timeLeft가 0이 되면 onTimeEnd 콜백 호출
 */
export function useTimer({ initialTime, onTimeEnd }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeEndRef = useRef(onTimeEnd);
  useEffect(() => {
    onTimeEndRef.current = onTimeEnd;
  }, [onTimeEnd]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
  }, [clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setTimeLeft(initialTime);
  }, [initialTime, clearTimer]);

  useEffect(() => {
    if (timeLeft === 0 && intervalRef.current) {
      clearTimer();
      onTimeEndRef.current?.();
    }
  }, [timeLeft, clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeLeft,
    start,
    pause,
    reset,
    formatTime: () => formatTime(timeLeft),
  };
}

export default useTimer;
