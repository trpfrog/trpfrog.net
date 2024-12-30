import * as React from 'react'

import { BlogPost } from '@trpfrog.net/posts'

import { gridLayoutStyle, MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { RelatedPosts } from '@blog/_components/RelatedPosts'
import styles from '@blog/_styles/blog.module.css'
import { fetchPost, fetchPostList, fetchSlugs } from '@blog/rpc'

import { ArticleSidebar } from './_components/ArticleSidebar'
import { ArticleSkeleton } from './_components/ArticleSkeleton'
import { EntryButtons } from './_components/EntryButtons'

interface PageProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await fetchSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Layout(props: PageProps) {
  const { slug } = await props.params

  const entry = await fetchPost(slug, 1)
  const tags = entry.tags
  const relatedPosts: BlogPost[] = tags[0]
    ? await fetchPostList(tags[0]).then(posts => posts.filter(post => post.slug !== slug))
    : []

  return (
    <MainWrapper gridLayout className={styles.layout}>
      <ArticleHeader post={entry} />
      <div className={styles.main_content}>
        <div className={gridLayoutStyle({ class: styles.article_wrapper })}>
          <React.Suspense fallback={<ArticleSkeleton />}>{props.children}</React.Suspense>
        </div>
        <aside>
          <ArticleSidebar post={entry} />
        </aside>
      </div>
      <Block id={styles.entry_bottom_buttons}>
        <EntryButtons post={entry} />
      </Block>
      <RelatedPosts tag={entry.tags[0]} relatedPosts={relatedPosts} />
    </MainWrapper>
  )
}
