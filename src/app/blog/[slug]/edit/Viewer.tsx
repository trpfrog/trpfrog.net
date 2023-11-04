'use client'

import React from 'react'

import { useScrollPositionKeeper } from '@/hooks/useScrollPositionKeeper'

import { useOverwritePageNavHref } from '@blog/[slug]/edit/_hooks/useOverwritePageNavHref'
import styles from '@blog/[slug]/edit/page.module.scss'
import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { buildBlogPost } from '@blog/_lib/buildBlogPost'
import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'

type Props = {
  rawMarkdown: string
  pageIdx: number
  setPageIdx: (pageIdx: number) => void
  scrollToTopRef?: React.RefObject<any>
}

export const Viewer = React.memo(function Viewer(props: Props) {
  const post = React.useMemo(
    () =>
      buildBlogPost('', props.rawMarkdown, {
        pagePos1Indexed: props.pageIdx,
      }),
    [props.rawMarkdown, props.pageIdx],
  )
  useOverwritePageNavHref(props.setPageIdx, props.scrollToTopRef)
  useScrollPositionKeeper(props.scrollToTopRef)
  return (
    <>
      <ArticleHeader
        post={post}
        className={styles.article_header}
        addEntryButtons={false}
        addEditButtonOnDevMode={false}
      />
      <BlogMarkdown entry={post} className={styles.blog_markdown} />
    </>
  )
})
