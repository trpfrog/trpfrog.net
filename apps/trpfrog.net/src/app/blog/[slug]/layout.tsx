import * as React from 'react'

import { BlogPost } from '@trpfrog.net/posts'

import { gridLayoutStyle, MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { ArticleSidebar } from '@blog/_components/ArticleSidebar'
import { ArticleSkeleton } from '@blog/_components/ArticleSkeleton'
import { EntryButtons } from '@blog/_components/EntryButtons'
import { RelatedPosts } from '@blog/_components/RelatedPosts'
import { fetchPost, fetchPostList } from '@blog/rpc'

import styles from './layout.module.css'

export default async function Layout(props: LayoutProps<'/blog/[slug]'>) {
  const { slug } = await props.params

  const entry = await fetchPost(slug)
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
