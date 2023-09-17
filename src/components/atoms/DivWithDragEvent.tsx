// 要素内でドラッグを開始したとき、要素外でもドラッグを継続するためのコンポーネント
import React from 'react'

type Props = Omit<React.ComponentPropsWithRef<'div'>, 'onDrag'> & {
  onDrag: (e: MouseEvent) => void
}

const DivWithDragEvent = React.forwardRef<HTMLDivElement, Props>(
  function DivWithDragEvent(props, ref) {
    const { onDrag, onMouseDown, onClick, ...rest } = props

    const [isDragging, setIsDragging] = React.useState(false)
    const handleDrag = React.useCallback(
      (e: MouseEvent) => {
        if (!isDragging) {
          return
        }
        onDrag(e)
      },
      [isDragging, onDrag],
    )

    const mouseUpHandler = React.useCallback(() => {
      setIsDragging(false)
    }, [setIsDragging])

    // 要素外でもドラッグと mouse up を検知するため document にイベントを登録する
    React.useEffect(() => {
      document.addEventListener('mouseup', mouseUpHandler)
      document.addEventListener('mousemove', handleDrag)
      return () => {
        document.removeEventListener('mouseup', mouseUpHandler)
        document.removeEventListener('mousemove', handleDrag)
      }
    }, [handleDrag, mouseUpHandler])

    return (
      <div
        ref={ref}
        onMouseDown={e => {
          setIsDragging(true)
          onMouseDown?.(e)
        }}
        onClick={e => {
          onDrag?.(e.nativeEvent)
          onClick?.(e)
        }}
        {...rest}
      />
    )
  },
)

export default DivWithDragEvent
