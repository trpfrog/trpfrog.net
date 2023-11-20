'use client'

import React, { useDeferredValue } from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { LoadingBlock } from '@/components/molecules/LoadingBlock'
import { useAlwaysShownHeader } from '@/components/organisms/Header'

import { useHealthCheck } from '@blog/[slug]/edit/_hooks/useHealthCheck'
import { useMarkdownState } from '@blog/[slug]/edit/_hooks/useMarkdownState'
import { useScrollToBottom } from '@blog/[slug]/edit/_hooks/useScrollToBottom'

import { Editor } from './Editor'
import styles from './page.module.scss'
import { Viewer } from './Viewer'

export default function Index(props: { params: { slug: string } }) {
  const [pageIdx, setPageIdx] = React.useState(1)

  const markdownState = useMarkdownState(props.params.slug)
  const deferredPost = useDeferredValue(markdownState.currentMarkdown)

  useAlwaysShownHeader()
  useHealthCheck()

  const { editorBlockRef, scrollToBottom } = useScrollToBottom()

  if (markdownState.isLoading) {
    return (
      <MainWrapper>
        <LoadingBlock isFullHeight={true} />
      </MainWrapper>
    )
  }

  return (
    <MainWrapper className={styles.fullscreen}>
      <button onClick={scrollToBottom}>Scroll to bottom</button>
      <div className={styles.editor_grid}>
        <Block
          ref={editorBlockRef}
          className={styles.editor_block}
          style={{ overflow: 'scroll' }}
        >
          <Editor markdownState={markdownState} />
        </Block>
        <div className={styles.viewer_wrapper}>
          <Viewer
            rawMarkdown={deferredPost}
            pageIdx={pageIdx}
            setPageIdx={setPageIdx}
          />
        </div>
      </div>
    </MainWrapper>
  )
}
