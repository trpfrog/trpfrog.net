'use client'

import React from 'react'

import useScrollPositionKeeper from '@/hooks/useScrollPositionKeeper'

import ArticleHeader from '@blog/_components/ArticleHeader'
import BlogPost from '@blog/_lib/blogPost'
import BlogMarkdown from '@blog/_renderer/BlogMarkdown'
import styles from '@blog/edit/[slug]/page.module.scss'
import useOverwritePageNavHref from '@blog/edit/_hooks/useOverwritePageNavHref'

type Props = {
  post: BlogPost
  setPageIdx: (pageIdx: number) => void
  scrollToTopRef?: React.RefObject<any>
}

export default React.memo(function Viewer(props: Props) {
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
      <BlogMarkdown
        entry={props.post}
        imageSize={{}}
        className={styles.blog_markdown}
      />
    </>
  )
})
