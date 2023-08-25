import {useCallback, useEffect, useState} from "react";
import {useUnmountEffect} from "@react-hookz/web";
import {useRouter} from "next/navigation";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return windowSize;
}

export function useSparseCallback(fn: (...args: any[]) => void, delayMs: number) {
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
