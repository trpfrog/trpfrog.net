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

export function useSparseCallback(fn: (...args: any[]) => void, delay: number) {
  const [timer, setTimer] = useState(Date.now());
  return useCallback((...innerArgs: Parameters<typeof fn>) => {
    if (Date.now() - timer > delay) {
      fn(...innerArgs);
      setTimer(Date.now());
    }
  }, [delay, fn, timer])
}
