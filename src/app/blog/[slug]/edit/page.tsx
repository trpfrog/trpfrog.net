'use client'

import React, { useDeferredValue, useRef } from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { LoadingBlock } from '@/components/molecules/LoadingBlock'
import { useAlwaysShownHeader } from '@/components/organisms/Header'

import { Editor } from '@blog/[slug]/edit/Editor'
import { Viewer } from '@blog/[slug]/edit/Viewer'

import styles from './page.module.scss'

export default function Index(props: { params: { slug: string } }) {
  const INITIAL_CONTENT = 'Loading...'
  const [post, setPost] = React.useState(INITIAL_CONTENT)
  const [initialPost, setInitialPost] = React.useState(INITIAL_CONTENT)

  const deferredPost = useDeferredValue(post)

  const [pageIdx, setPageIdx] = React.useState(1)

  React.useEffect(() => {
    fetch(`/blog/${props.params.slug}/edit/api/read`, {
      headers: {
        'x-blog-slug': props.params.slug,
      },
    })
      .then(res => res.text())
      .then(text => {
        setPost(text)
        setInitialPost(text)
      })
      .catch(console.error)
  }, [props.params.slug])

  useAlwaysShownHeader()
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  const editorBlockRef = React.useRef<HTMLDivElement>(null)
  const scrollToBottom = React.useCallback(() => {
    if (editorBlockRef.current) {
      editorBlockRef.current.scrollTop = editorBlockRef.current.scrollHeight
    }
    if (document) {
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    }
  }, [])

  if (post === INITIAL_CONTENT) {
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
          <Editor
            slug={props.params.slug}
            rawMarkdown={initialPost}
            setPost={setPost}
          />
        </Block>
        <div className={styles.viewer_wrapper} ref={scrollToTopRef}>
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
