// 要素内でドラッグを開始したとき、要素外でもドラッグを継続するためのコンポーネント
import * as React from 'react'
import { useCallback, useState, useEffect } from 'react'

type Props = React.ComponentPropsWithRef<'div'> & {
  onDragging: (e: MouseEvent) => void
}

export function DivWithDragEvent(props: Props) {
  const { onDragging, onMouseDown, onClick, ...rest } = props

  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const defaultStyle = document.body.style.touchAction
    document.body.style.touchAction = isDragging ? 'none' : defaultStyle
    return () => {
      document.body.style.touchAction = defaultStyle
    }
  }, [isDragging])

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return // div 外のドラッグにも反応してしまうため、これより上には処理を書かない
      e.preventDefault()
      onDragging(e)
    },
    [isDragging, onDragging],
  )

  const mouseUpHandler = useCallback(() => {
    setIsDragging(false)
  }, [setIsDragging])

  // 要素外でもドラッグと mouse up を検知するため document にイベントを登録する
  useEffect(() => {
    document.addEventListener('pointerup', mouseUpHandler)
    document.addEventListener('pointermove', handleDrag)
    return () => {
      document.removeEventListener('pointerup', mouseUpHandler)
      document.removeEventListener('pointermove', handleDrag)
    }
  }, [handleDrag, mouseUpHandler])

  return (
    <div
      ref={props.ref}
      onPointerDown={e => {
        setIsDragging(true)
        onDragging?.(e.nativeEvent)
      }}
      onClick={e => {
        onDragging?.(e.nativeEvent)
        onClick?.(e)
      }}
      {...rest}
    />
  )
}
