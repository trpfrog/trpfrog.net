import * as React from 'react'

export function useHoverScrollBoxEvent(scrollAreaRef: React.RefObject<HTMLElement | null>) {
  const [intervalId, setIntervalId] = React.useState<number | null>(null)

  const handleMouseEnter = React.useCallback(
    (dx: number, dy: number) => () => {
      if (scrollAreaRef.current == null) return

      // 自動スクロール
      const scrollSpeed = 10
      const newIntervalId = window.setInterval(() => {
        if (scrollAreaRef.current == null) {
          window.clearInterval(newIntervalId)
          return
        }
        scrollAreaRef.current.scrollBy(dx * scrollSpeed, dy * scrollSpeed)
      }, 25)

      // 別の自動スクロールが動いていたらキャンセルしておく
      if (intervalId != null) window.clearInterval(intervalId)
      setIntervalId(newIntervalId)
    },
    [intervalId, scrollAreaRef],
  )

  // ボタンから離れたら自動スクロールを止める
  const handleMouseLeave = React.useCallback(() => {
    if (intervalId == null) return
    window.clearInterval(intervalId)
    setIntervalId(null)
  }, [intervalId])

  return React.useMemo(
    () => ({ handleMouseEnter, handleMouseLeave }),
    [handleMouseEnter, handleMouseLeave],
  )
}
