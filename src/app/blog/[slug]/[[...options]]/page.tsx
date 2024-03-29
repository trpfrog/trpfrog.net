import { Metadata } from 'next'

import { gridLayoutStyle, MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { RelatedPosts } from '@blog/_components/RelatedPosts'
import { BlogPost } from '@blog/_lib/blogPost'
import { fetchBlogPost, retrieveSortedBlogPostList } from '@blog/_lib/load'
import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_renderer/DevBlogMarkdown/DevBlogMarkdown'
import { renderBlog } from '@blog/_renderer/renderBlog'
import styles from '@blog/_styles/blog.module.scss'

import { env } from '@/env/server'

import { ArticleSidebar } from './_components/ArticleSidebar'
import { EntryButtons } from './_components/EntryButtons'

export const dynamicParams = false

type PageProps = {
  params: {
    slug: string
    options?: string[]
  }
}

export async function generateStaticParams({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const entry = await fetchBlogPost(slug)
  const paths = []
  for (let i = 1; i <= entry.numberOfPages; i++) {
    paths.push({ options: [i + ''] })
  }
  paths.push({ options: ['all'] })
  paths.push({ options: undefined })
  return paths
}

export async function generateMetadata({ params }: PageProps) {
  const { title, description } = await fetchBlogPost(params.slug)

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      locale: 'ja-JP',
      siteName: title,
      description,
      type: 'website',
      images: [{ url: `/blog/${params.slug}/og-image` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@TrpFrog',
      creator: '@TrpFrog',
    },
  }

  return metadata
}

const processSlug = async (slug: string, page?: string) => {
  const entry: BlogPost = await fetchBlogPost(slug, {
    pagePos1Indexed: page ? parseInt(page, 10) : 1,
    all: page === 'all',
  })

  const tags = entry.tags
  const relatedPosts: BlogPost[] = tags[0]
    ? []
    : (await retrieveSortedBlogPostList(tags[0])).filter(
        (e: BlogPost) => e.slug !== entry.slug,
      )

  return {
    entry: JSON.parse(JSON.stringify(entry)) as BlogPost,
    relatedPosts,
  }
}

export default async function Index({ params: { slug, options } }: PageProps) {
  const page = options?.[0]

  const { entry, relatedPosts } = await processSlug(slug, page)

  // TODO: コメントアウトするとなぜかビルドできなくなるので調査
  await renderBlog(slug, page)

  return (
    <MainWrapper gridLayout className={styles.layout}>
      <ArticleHeader post={entry} />
      <div className={styles.main_content}>
        <div className={gridLayoutStyle({ class: styles.article_wrapper })}>
          {env.NODE_ENV === 'production' ? (
            <BlogMarkdown entry={entry} />
          ) : (
            <DevBlogMarkdown slug={slug} page={page} />
          )}
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
