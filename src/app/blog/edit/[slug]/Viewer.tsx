'use client'

import BlogMarkdown from '@/app/blog/_renderer/BlogMarkdown'
import React from 'react'
import styles from '@/app/blog/edit/[slug]/page.module.scss'
import BlogPost from '@/app/blog/_lib/blogPost'
import useOverwritePageNavHref from '@/app/blog/edit/_hooks/useOverwritePageNavHref'
import ArticleHeader from '@/app/blog/_components/ArticleHeader'
import useScrollPositionKeeper from '@/hooks/useScrollPositionKeeper'

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
