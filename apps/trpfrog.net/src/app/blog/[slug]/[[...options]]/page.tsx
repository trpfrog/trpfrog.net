import { Metadata } from 'next'

import { BlogPost } from '@trpfrog.net/posts'
import { z } from 'zod'

import { env } from '@/env/server.ts'

import { gridLayoutStyle, MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { RelatedPosts } from '@blog/_components/RelatedPosts'
import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_renderer/DevBlogMarkdown'
import styles from '@blog/_styles/blog.module.scss'
import { fetchPost, fetchPostList } from '@blog/rpc'

import { ArticleSidebar } from './_components/ArticleSidebar'
import { EntryButtons } from './_components/EntryButtons'

export const dynamicParams = true

// 1, 2, 3, ... or 'all'
const pageNumberSchema = z.coerce.number().int().positive().or(z.literal('all'))

const paramsSchema = z.object({
  slug: z.string(),
  options: z.tuple([z.string().pipe(pageNumberSchema)]).default(['1']),
})
type PageProps = {
  params: Promise<z.input<typeof paramsSchema>>
}

export async function generateStaticParams() {
  return [{ options: undefined }, { options: ['all'] }]
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params

  const { slug } = params

  const { title, description } = await fetchPost(slug)

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
  const entry = await fetchPost(slug, page)
  const tags = entry.tags
  const relatedPosts: BlogPost[] = tags[0]
    ? await fetchPostList(tags[0]).then(posts => posts.filter(post => post.slug !== slug))
    : []

  return { entry, relatedPosts }
}

export default async function Index(props: PageProps) {
  const rawParams = await props.params
  const {
    slug,
    options: [page],
  } = paramsSchema.parse(rawParams)

  const { entry, relatedPosts } = await processSlug(slug, page)

  return (
    <MainWrapper gridLayout className={styles.layout}>
      <ArticleHeader post={entry} />
      <div className={styles.main_content}>
        <div className={gridLayoutStyle({ class: styles.article_wrapper })}>
          {env.NODE_ENV === 'production' || env.USE_DEV_REALTIME_BLOG_PREVIEW !== 'true' ? (
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
