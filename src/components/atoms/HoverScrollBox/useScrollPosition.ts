import React from 'react'

import { useThrottledCallback } from '@react-hookz/web'

type ScrollPosition = 'top' | 'middle' | 'bottom'

/**
 * スクロール位置として `top`, `middle`, `bottom` のいずれかを返す
 * `handleScroll` は `onScroll` に渡すこと
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] =
    React.useState<ScrollPosition>('top')

  const handleScroll = useThrottledCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const { scrollTop, scrollHeight, clientHeight } =
        e.target as HTMLDivElement
      const scrollBottom = scrollHeight - scrollTop - clientHeight

      if (scrollTop === 0) {
        setScrollPosition('top')
      } else if (scrollBottom === 0) {
        setScrollPosition('bottom')
      } else {
        setScrollPosition('middle')
      }
    },
    [],
    100,
  )

  return React.useMemo(
    () => ({ scrollPosition, handleScroll }),
    [handleScroll, scrollPosition],
  )
}
