import { useState, useEffect } from 'react'

import { BrowserTarget, useBrowserEvent } from '@/hooks/useBrowserEvent'

export function useDragEvent<T extends BrowserTarget>(
  target: T,
  onDragging: (e: MouseEvent) => void,
) {
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const defaultStyle = document.body.style.touchAction
    document.body.style.touchAction = isDragging ? 'none' : defaultStyle
    return () => {
      document.body.style.touchAction = defaultStyle
    }
  }, [isDragging])

  // 要素内でドラッグを開始したときの処理
  useBrowserEvent(target, 'pointerdown', e => {
    setIsDragging(true)
    onDragging?.(e)
  })

  // click 時は pointerdown が発火しないため、ここで処理を行う
  useBrowserEvent(target, 'click', e => {
    onDragging?.(e)
  })

  // 要素外でもドラッグを検知するため document にイベントを登録する
  useBrowserEvent('document', 'pointermove', e => {
    if (!isDragging) return // div 外のドラッグにも反応してしまうため、これより上には処理を書かない
    e.preventDefault()
    onDragging(e)
  })

  // 要素外でも mouse up を検知するため document にイベントを登録する
  useBrowserEvent('document', 'pointerup', () => {
    setIsDragging(false)
  })

  return isDragging
}
