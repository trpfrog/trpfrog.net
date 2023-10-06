import { useCallback, useState } from 'react'

export function useSparseCallback(
  fn: (...args: any[]) => void,
  deps: any[],
  delayMs: number,
) {
  const [timer, setTimer] = useState(0)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  return useCallback(
    (...innerArgs: Parameters<typeof fn>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (Date.now() - timer > delayMs) {
        fn(...innerArgs)
        setTimer(Date.now())
      } else {
        const newTimeoutId = setTimeout(() => {
          fn(...innerArgs)
          setTimer(Date.now())
        }, delayMs)
        setTimeoutId(newTimeoutId)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delayMs, fn, timeoutId, timer, ...deps],
  )
}
