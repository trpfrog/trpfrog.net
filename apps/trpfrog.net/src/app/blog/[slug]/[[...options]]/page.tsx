import { Metadata } from 'next'

import { BlogPageNumberSchema } from '@trpfrog.net/posts'
import { validate, InferSchemaOutput } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { env } from '@/env/server.ts'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_components/DevBlogMarkdown'
import { fetchPost } from '@blog/rpc'

export const dynamicParams = true

const ParamsSchema = v.object({
  slug: v.string(),
  options: v.optional(v.tuple([BlogPageNumberSchema]), ['1']),
})

type PageProps = {
  params: Promise<InferSchemaOutput<typeof ParamsSchema>>
}

export async function generateStaticParams(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const entry = await fetchPost(slug)
  const paths: { options?: string[] }[] = []
  for (let i = 1; i <= entry.numberOfPages; i++) {
    paths.push({ options: [i.toString()] })
  }
  paths.push({ options: ['all'] })
  paths.push({ options: undefined })

  return paths
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

export default async function Index(props: PageProps) {
  const rawParams = await props.params
  const {
    slug,
    options: [page],
  } = validate(ParamsSchema, rawParams)

  const entry = await fetchPost(slug, page)
  return process.env.NODE_ENV === 'production' || env.USE_DEV_REALTIME_BLOG_PREVIEW !== 'true' ? (
    <BlogMarkdown entry={entry} />
  ) : (
    <DevBlogMarkdown slug={slug} page={page} />
  )
}
