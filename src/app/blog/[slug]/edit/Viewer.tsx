'use client'

import React from 'react'

import { useScrollPositionKeeper } from '@/hooks/useScrollPositionKeeper'

import { useOverwritePageNavHref } from '@blog/[slug]/edit/_hooks/useOverwritePageNavHref'
import styles from '@blog/[slug]/edit/page.module.scss'
import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { BlogPost } from '@blog/_lib/blogPost'
import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'

type Props = {
  post: BlogPost
  setPageIdx: (pageIdx: number) => void
  scrollToTopRef?: React.RefObject<any>
}

export const Viewer = React.memo(function Viewer(props: Props) {
  useOverwritePageNavHref(props.setPageIdx, props.scrollToTopRef)
  useScrollPositionKeeper(props.scrollToTopRef)
  return (
    <>
      <ArticleHeader
        post={props.post}
        className={styles.article_header}
        addEntryButtons={false}
        addEditButtonOnDevMode={false}
      />
      <BlogMarkdown entry={props.post} className={styles.blog_markdown} />
    </>
  )
})
