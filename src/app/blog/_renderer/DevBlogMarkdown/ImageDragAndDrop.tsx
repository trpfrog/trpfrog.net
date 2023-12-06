'use client'
import React, { useCallback, useState } from 'react'

import { useUploadFunction } from '@blog/_renderer/DevBlogMarkdown/useUploadFunction'

import styles from './ImageDragAndDrop.module.scss'

export function ImageDragAndDrop(props: { slug: string }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isTabOpen, setIsTabOpen] = useState(false)
  const uploadImage = useUploadFunction(props.slug)

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
        const paths = await Promise.all(
          Array.from(e.dataTransfer.files).map(uploadImage),
        )
        await navigator.clipboard.writeText(
          paths.map(e => `![](${e})` as const).join('\n'),
        )
        e.dataTransfer.clearData()
      }
    },
    [uploadImage],
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.tab} onClick={() => setIsTabOpen(prv => !prv)}>
        Image Uploader
      </div>
      {isTabOpen && (
        <div
          className={styles.drag_and_drop}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={e => e.preventDefault()}
          onDrop={onDrop}
          style={{ color: isDragging ? 'inherit' : 'lightgray' }}
        >
          Drag and drop
          <br />
          images here
        </div>
      )}
    </div>
  )
}
