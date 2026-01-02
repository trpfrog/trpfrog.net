import { Metadata } from 'next'

import { cacheTags } from '@trpfrog.net/constants'
import { cacheLife, cacheTag } from 'next/cache'

import { env } from '@/env/server.ts'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_components/DevBlogMarkdown'
import { fetchPost } from '@blog/rpc'

import { validateBlogPath } from '../../validate-path'

export async function generateMetadata(props: PageProps<'/blog/[slug]/[[...options]]'>) {
  const params = await props.params
  const { slug } = validateBlogPath(params.slug, params.options?.[0])

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

export default async function Index(props: PageProps<'/blog/[slug]/[[...options]]'>) {
  'use cache'
  cacheTag(cacheTags.entireBlog.tag, cacheTags.blogSlug.tag((await props.params).slug))
  cacheLife('cache-if-production')

  const params = await props.params
  const { slug, page } = validateBlogPath(params.slug, params.options?.[0])
  const entry = await fetchPost(slug, page)
  return process.env.NODE_ENV === 'production' || env.USE_DEV_REALTIME_BLOG_PREVIEW !== 'true' ? (
    <BlogMarkdown entry={entry} />
  ) : (
    <DevBlogMarkdown slug={slug} page={page} />
  )
}
