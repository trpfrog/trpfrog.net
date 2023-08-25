import {useCallback, useState} from "react";

export default function useSparseCallback(fn: (...args: any[]) => void, delayMs: number) {
  const [timer, setTimer] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  return useCallback((...innerArgs: Parameters<typeof fn>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (Date.now() - timer > delayMs) {
      fn(...innerArgs);
      setTimer(Date.now());
    } else {
      const newTimeoutId = setTimeout(() => {
        fn(...innerArgs);
        setTimer(Date.now());
      }, delayMs)
      setTimeoutId(newTimeoutId);
    }
  }, [delayMs, fn, timeoutId, timer])
}
