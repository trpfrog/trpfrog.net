import { Metadata } from 'next'

import { BlogPost } from '@trpfrog.net/posts'
import { readBlogPost, readAllBlogPosts } from '@trpfrog.net/posts/fs'
import { match } from 'ts-pattern'
import { z } from 'zod'

import { env } from '@/env/server.ts'

import { gridLayoutStyle, MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { RelatedPosts } from '@blog/_components/RelatedPosts'
import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_renderer/DevBlogMarkdown'
import { renderBlog } from '@blog/_renderer/renderBlog'
import styles from '@blog/_styles/blog.module.scss'

import { ArticleSidebar } from './_components/ArticleSidebar'
import { EntryButtons } from './_components/EntryButtons'

export const dynamicParams = false

// 1, 2, 3, ... or 'all'
const pageNumberSchema = z.coerce.number().int().positive().or(z.literal('all'))

const pagePropsSchema = z.object({
  params: z.object({
    slug: z.string(),
    options: z.tuple([z.string().pipe(pageNumberSchema)]).default(['1']),
  }),
})
type PageProps = z.input<typeof pagePropsSchema>

export async function generateStaticParams({ params: { slug } }: { params: { slug: string } }) {
  const entry = await readBlogPost(slug)
  const paths: { options?: string[] }[] = []
  for (let i = 1; i <= entry.numberOfPages; i++) {
    paths.push({ options: [i.toString()] })
  }
  paths.push({ options: ['all'] })
  paths.push({ options: undefined })

  return paths
}

export async function generateMetadata({ params: { slug } }: PageProps) {
  const { title, description } = await readBlogPost(slug)

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      locale: 'ja-JP',
      siteName: title,
      description,
      type: 'website',
      images: [{ url: `/blog/${slug}/og-image` }],
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

const processSlug = async (slug: string, page: number | 'all') => {
  const entry: BlogPost = await match(page)
    .with('all', () => readBlogPost(slug, { all: true }))
    .otherwise(page => readBlogPost(slug, { pagePos1Indexed: page }))

  const tags = entry.tags
  const relatedPosts: BlogPost[] = tags[0]
    ? []
    : (await readAllBlogPosts({ tag: tags[0] })).filter(e => e.slug !== entry.slug)

  return { entry, relatedPosts }
}

export default async function Index(props: PageProps) {
  const {
    params: {
      slug,
      options: [page],
    },
  } = pagePropsSchema.parse(props)

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
