// 要素内でドラッグを開始したとき、要素外でもドラッグを継続するためのコンポーネント
import React from 'react'

type Props = Omit<React.ComponentPropsWithRef<'div'>, 'onPointerDown'> & {
  onPointerDown: (e: MouseEvent) => void
}

const DivWithDragEvent = React.forwardRef<HTMLDivElement, Props>(
  function DivWithDragEvent(props, ref) {
    const { onPointerDown, onMouseDown, onClick, ...rest } = props

    const [isDragging, setIsDragging] = React.useState(false)
    const handleDrag = React.useCallback(
      (e: MouseEvent) => {
        e.preventDefault()
        document.body.style.touchAction = 'none'
        if (!isDragging) {
          return
        }
        onPointerDown(e)
      },
      [isDragging, onPointerDown],
    )

    const mouseUpHandler = React.useCallback(() => {
      document.body.style.touchAction = ''
      setIsDragging(false)
    }, [setIsDragging])

    // 要素外でもドラッグと mouse up を検知するため document にイベントを登録する
    React.useEffect(() => {
      document.addEventListener('pointerup', mouseUpHandler)
      document.addEventListener('pointermove', handleDrag, { passive: false })
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
          onPointerDown?.(e)
        }}
        onClick={e => {
          onPointerDown?.(e.nativeEvent)
          onClick?.(e)
        }}
        {...rest}
      />
    )
  },
)

export default DivWithDragEvent
