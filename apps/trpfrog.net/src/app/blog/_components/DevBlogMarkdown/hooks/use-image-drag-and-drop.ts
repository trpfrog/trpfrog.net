import { useCallback, useState } from 'react'
import type { DragEvent } from 'react'

export function useImageDragAndDrop(onDroppedImage: (files: File[]) => Promise<void>) {
  const [isDragging, setIsDragging] = useState(false)

  const onDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const onDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const onDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
        await onDroppedImage(Array.from(e.dataTransfer.files))
        e.dataTransfer.clearData()
      }
    },
    [onDroppedImage],
  )

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return {
    isDragging,
    dropTargetProps: { onDragEnter, onDragLeave, onDrop, onDragOver },
  }
}

export type DropTargetProps = ReturnType<typeof useImageDragAndDrop>['dropTargetProps']
