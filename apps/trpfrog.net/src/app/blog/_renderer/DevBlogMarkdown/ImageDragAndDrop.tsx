'use client'
import { useCallback, useState } from 'react'
import * as React from 'react'

import { CodeBlock } from '@/components/molecules/CodeBlock'

import { useUploadFunction } from '@blog/_renderer/DevBlogMarkdown/useUploadFunction'

import styles from './ImageDragAndDrop.module.scss'

function useImageDragAndDrop(onDroppedImage: (files: FileList) => Promise<void>) {
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
        await onDroppedImage(e.dataTransfer.files)
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
  const uploadImage = useUploadFunction(props.slug)

  const onDroppedImage = useCallback(
    async (files: FileList) => {
      setRecentlyUploaded('Uploading...')
      const paths = await Promise.all(Array.from(files).map(uploadImage))
      const imageMarkdown = paths.map(e => `![](${e})` as const).join('\n')
      setRecentlyUploaded(imageMarkdown)
    },
    [uploadImage],
  )

  const { isDragging, dropTargetProps } = useImageDragAndDrop(onDroppedImage)

  return (
    <div className={`${styles.wrapper} print:tw-invisible`}>
      <div className={styles.tab} onClick={() => setisTabOpened(prv => !prv)}>
        Image Uploader
      </div>
      {isTabOpened && (
        <>
          <div
            className={styles.drag_and_drop}
            style={{ color: isDragging ? 'inherit' : 'lightgray' }}
            {...dropTargetProps}
          >
            <div
              className={styles.drag_and_drop_text}
              style={{
                borderColor: isDragging ? 'var(--header-color)' : 'var(--window-bkg-color)',
              }}
            >
              Drag and drop
              <br />
              images here
            </div>
          </div>
          {recentlyUploaded !== '' && (
            <div className={styles.code_block}>
              <form>
                <input
                  type="checkbox"
                  checked={horizontalImages}
                  onChange={e => setHorizontalImages(e.target.checked)}
                />
                <label style={{ verticalAlign: '0.2em' }}>Horizontal Images</label>
              </form>
              <CodeBlock language={'markdown'} fileName={'Recently Uploaded'}>
                {horizontalImages
                  ? '```horizontal-images\n' + recentlyUploaded + '\n```'
                  : recentlyUploaded}
              </CodeBlock>
            </div>
          )}
        </>
      )}
    </div>
  )
}
