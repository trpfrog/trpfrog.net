'use client'
import { useCallback, useState } from 'react'
import * as React from 'react'

import toast from 'react-hot-toast'

import { PlainCodeBlock } from '@/components/molecules/CodeBlock/PlainCodeBlock'
import { LabelledCheckbox } from '@/components/molecules/LabelledCheckbox'

import { twMerge } from '@/lib/tailwind'

import { useImageUploader } from './hooks/useImageUploader'
import styles from './ImageDragAndDrop.module.css'

function useImageDragAndDrop(onDroppedImage: (files: File[]) => Promise<void>) {
  const [isDragging, setIsDragging] = useState(false)

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const onDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
        await onDroppedImage(Array.from(e.dataTransfer.files))
        e.dataTransfer.clearData()
      }
    },
    [onDroppedImage],
  )

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return {
    isDragging,
    dropTargetProps: { onDragEnter, onDragLeave, onDrop, onDragOver },
  }
}

export function ImageDragAndDropUploader(props: { slug: string }) {
  const [isTabOpened, setisTabOpened] = useState(false)
  const [recentlyUploaded, setRecentlyUploaded] = useState('')
  const [horizontalImages, setHorizontalImages] = useState(false)
  const [appendToFileEnd, setAppendToFileEnd] = useState(false)

  const markdownCode = horizontalImages
    ? '```horizontal-images\n' + recentlyUploaded + '\n```'
    : recentlyUploaded

  const { upload, uploadingStatusText, appendLine } = useImageUploader(props.slug)

  const onDroppedImage = useCallback(
    async (files: File[]) => {
      const uploaded = await toast.promise(upload(files), {
        loading: 'Uploading...',
        success: <b>Uploaded!</b>,
        error: <b>Something went wrong...</b>,
      })
      const markdown = uploaded.map(e => e.markdown).join('\n')
      setRecentlyUploaded(markdown)

      if (appendToFileEnd && markdown !== '') {
        const markdownToAppend = horizontalImages
          ? '```horizontal-images\n' + markdown + '\n```'
          : markdown
        await toast.promise(appendLine(markdownToAppend), {
          loading: 'Appending...',
          success: <b>Appended!</b>,
          error: <b>Failed to append</b>,
        })
      }
    },
    [appendLine, appendToFileEnd, horizontalImages, upload],
  )

  const { isDragging, dropTargetProps } = useImageDragAndDrop(onDroppedImage)

  return (
    <div className={`${styles.wrapper} tw:print:invisible`}>
      <div className={styles.tab} onClick={() => setisTabOpened(prv => !prv)}>
        Image Uploader
      </div>
      {isTabOpened && (
        <>
          <div
            className={twMerge(
              styles.drag_and_drop,
              isDragging ? 'tw:text-inherit' : 'tw:text-gray-300',
            )}
            {...dropTargetProps}
          >
            <div
              className={twMerge(
                styles.drag_and_drop_text,
                isDragging ? 'tw:border-(--header-color)' : 'tw:border-(--window-bkg-color)',
              )}
            >
              Drag and drop
              <br />
              images here
            </div>
          </div>
          <div className={styles.code_block}>
            <form className="tw:mb-1">
              <LabelledCheckbox checked={horizontalImages} onChange={setHorizontalImages}>
                Horizontal Images
              </LabelledCheckbox>
              <LabelledCheckbox checked={appendToFileEnd} onChange={setAppendToFileEnd}>
                ファイル末尾に追記
              </LabelledCheckbox>
            </form>
            <PlainCodeBlock
              fileName={'Recently Uploaded'}
              copyContent={recentlyUploaded ? markdownCode : undefined}
            >
              {uploadingStatusText ?? (markdownCode || 'No images uploaded yet.')}
            </PlainCodeBlock>
          </div>
        </>
      )}
    </div>
  )
}
