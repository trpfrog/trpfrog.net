import { Metadata } from 'next'

import { env } from '@/env/server.ts'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_components/DevBlogMarkdown'
import { fetchPost } from '@blog/rpc'

import { validateBlogPath } from '../../validate-path'

export const dynamicParams = true

// TODO: Use more appropriate types for props
export async function generateStaticParams(props: { params: { slug: string } }) {
  const { slug } = props.params
  const entry = await fetchPost(slug)
  const paths: { options?: string[] }[] = []
  for (let i = 1; i <= entry.numberOfPages; i++) {
    paths.push({ options: [i.toString()] })
  }
  paths.push({ options: ['all'] })
  paths.push({ options: undefined })

  return paths
}

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
  const params = await props.params
  const { slug, page } = validateBlogPath(params.slug, params.options?.[0])
  const entry = await fetchPost(slug, page)
  return process.env.NODE_ENV === 'production' || env.USE_DEV_REALTIME_BLOG_PREVIEW !== 'true' ? (
    <BlogMarkdown entry={entry} />
  ) : (
    <DevBlogMarkdown slug={slug} page={page} />
  )
}
