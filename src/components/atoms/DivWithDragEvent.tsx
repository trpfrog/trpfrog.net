// 要素内でドラッグを開始したとき、要素外でもドラッグを継続するためのコンポーネント
import React from 'react'

type Props = React.ComponentPropsWithRef<'div'> & {
  onDragging: (e: MouseEvent) => void
}

export const DivWithDragEvent = React.forwardRef<HTMLDivElement, Props>(
  function DivWithDragEvent(props, ref) {
    const { onDragging, onMouseDown, onClick, ...rest } = props

    const [isDragging, setIsDragging] = React.useState(false)
    const handleDrag = React.useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return // div 外のドラッグにも反応してしまうため、これより上には処理を書かない
        e.preventDefault()
        document.body.style.touchAction = 'none'
        onDragging(e)
      },
      [isDragging, onDragging],
    )

    const mouseUpHandler = React.useCallback(() => {
      document.body.style.touchAction = ''
      setIsDragging(false)
    }, [setIsDragging])

    // 要素外でもドラッグと mouse up を検知するため document にイベントを登録する
    React.useEffect(() => {
      document.addEventListener('pointerup', mouseUpHandler)
      document.addEventListener('pointermove', handleDrag)
      return () => {
        document.removeEventListener('pointerup', mouseUpHandler)
        document.removeEventListener('pointermove', handleDrag)
      }
    }, [handleDrag, mouseUpHandler])

    return (
      <div
        ref={ref}
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
  },
)
