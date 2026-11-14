'use client'
import { useCallback, useMemo, useState } from 'react'

import { toast } from '@ui-sdk/react/toast'

import { useImageDragAndDrop } from '../hooks/use-image-drag-and-drop'
import { useImageUploader } from '../hooks/useImageUploader'
import { ImageUploaderSection } from './image-uploader-section'
import { TwitterCardSection } from './twitter-card-section'
import { useTwitterBlockGenerator } from './use-twitter-block-generator'
import { WritingToolsOutput } from './writing-tools-output'
import { WritingToolsPanel } from './writing-tools-panel'

export function WritingTools(props: { slug: string }) {
  const [isTabOpened, setisTabOpened] = useState(false)
  const [recentlyUploaded, setRecentlyUploaded] = useState('')
  const [tweetUrl, setTweetUrl] = useState('')
  const [tweetBlockOutput, setTweetBlockOutput] = useState('')
  const [lastOutputSource, setLastOutputSource] = useState<null | 'image' | 'twitter'>(null)
  const [horizontalImages, setHorizontalImages] = useState(false)
  const [appendToFileEnd, setAppendToFileEnd] = useState(false)

  const markdownCode = horizontalImages
    ? '```horizontal-images\n' + recentlyUploaded + '\n```'
    : recentlyUploaded

  const { upload, uploadingStatusText, appendLine } = useImageUploader(props.slug)

  const outputText = useMemo(() => {
    if (lastOutputSource === 'image') {
      return markdownCode
    }
    if (lastOutputSource === 'twitter') {
      return tweetBlockOutput
    }
    return ''
  }, [lastOutputSource, markdownCode, tweetBlockOutput])

  const onDroppedImage = useCallback(
    async (files: File[]) => {
      const uploading = upload(files)
      toast.promise(uploading, {
        loading: 'Uploading...',
        success: 'Uploaded!',
        error: 'Something went wrong...',
      })
      const uploaded = await uploading
      const markdown = uploaded.map(e => e.markdown).join('\n')
      setRecentlyUploaded(markdown)
      setLastOutputSource('image')

      if (appendToFileEnd && markdown !== '') {
        const markdownToAppend = horizontalImages
          ? '```horizontal-images\n' + markdown + '\n```'
          : markdown
        const appending = appendLine(markdownToAppend)
        toast.promise(appending, {
          loading: 'Appending...',
          success: 'Appended!',
          error: 'Failed to append',
        })
        await appending
      }
    },
    [appendLine, appendToFileEnd, horizontalImages, upload],
  )

  const { isDragging, dropTargetProps } = useImageDragAndDrop(onDroppedImage)

  const { generateFromUrl, generateFromServerClipboard } = useTwitterBlockGenerator({
    onOutput: codeBlock => {
      setTweetBlockOutput(codeBlock)
      setLastOutputSource('twitter')
    },
  })

  const codeBlockContent = uploadingStatusText ?? (outputText || 'No output yet.')

  return (
    <WritingToolsPanel isOpened={isTabOpened} onToggle={() => setisTabOpened(prv => !prv)}>
      <ImageUploaderSection
        isDragging={isDragging}
        dropTargetProps={dropTargetProps}
        horizontalImages={horizontalImages}
        appendToFileEnd={appendToFileEnd}
        onHorizontalImagesChange={setHorizontalImages}
        onAppendToFileEndChange={setAppendToFileEnd}
      />
      <TwitterCardSection
        tweetUrl={tweetUrl}
        onTweetUrlChange={setTweetUrl}
        onGenerate={() => void generateFromUrl(tweetUrl)}
        onGenerateFromServerClipboard={() => void generateFromServerClipboard()}
      />
      <WritingToolsOutput outputText={outputText} codeBlockContent={codeBlockContent} />
    </WritingToolsPanel>
  )
}
