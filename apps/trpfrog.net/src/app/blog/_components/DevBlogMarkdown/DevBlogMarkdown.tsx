'use client'

import { BlogPageNumber } from '@trpfrog.net/posts'

import { ArticleSkeleton } from '@blog/_components/ArticleSkeleton'
import { WritingTools } from '@blog/_components/DevBlogMarkdown/writing-tools'

import { useDevServerRenderedBlog } from './hooks/useDevServerRenderedBlog'
import { useHeightAdjustedScrollOnResize } from './hooks/useHeightAdjustedScrollOnResize'

type DevBlogMarkdownProps = {
  slug: string
  page?: BlogPageNumber
}

export function DevBlogMarkdown(props: DevBlogMarkdownProps) {
  const res = useDevServerRenderedBlog(props.slug, props.page)
  useHeightAdjustedScrollOnResize()

  if (res.isLoading) {
    return <ArticleSkeleton />
  }

  // Returns stale article while fetching
  return (
    <>
      {res.rendered}
      <WritingTools slug={props.slug} />
    </>
  )
}
