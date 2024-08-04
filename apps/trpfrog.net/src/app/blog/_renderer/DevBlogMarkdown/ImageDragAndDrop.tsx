'use client'
import { useCallback, useState } from 'react'
import * as React from 'react'

import { useUploadFunction } from '@blog/_renderer/DevBlogMarkdown/useUploadFunction'

import styles from './ImageDragAndDrop.module.scss'

export function ImageDragAndDrop(props: { slug: string }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isTabOpened, setisTabOpened] = useState(false)
  const [recentlyUploaded, setRecentlyUploaded] = useState('')
  const [horizontalImages, setHorizontalImages] = useState(false)
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
        setRecentlyUploaded('Uploading...')
        const paths = await Promise.all(Array.from(e.dataTransfer.files).map(uploadImage))
        const imageMarkdown = paths.map(e => `![](${e})` as const).join('\n')
        setRecentlyUploaded(imageMarkdown)
        e.dataTransfer.clearData()
      }
    },
    [uploadImage],
  )

  return (
    <div className={`${styles.wrapper} print:tw-invisible`}>
      <div className={styles.tab} onClick={() => setisTabOpened(prv => !prv)}>
        Image Uploader
      </div>
      {isTabOpened && (
        <>
          <div
            className={styles.drag_and_drop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
            style={{ color: isDragging ? 'inherit' : 'lightgray' }}
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
              {/* TODO: React Compiler 側がエラーを吐かなくなったら戻す */}
              {/*<CodeBlock language={'markdown'} fileName={'Recently Uploaded'}>*/}
              <pre>
                {horizontalImages
                  ? '```horizontal-images\n' + recentlyUploaded + '\n```'
                  : recentlyUploaded}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  )
}
