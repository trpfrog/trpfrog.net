import { Metadata } from 'next'

import { BlogPageNumber, BlogPageNumberSchema } from '@trpfrog.net/posts'
import {
  fetchPreviewBlogPost,
  createErrorArticle,
  ErrorablePost,
  createPreviewClient,
} from '@trpfrog.net/posts/preview'
import { safeValidate } from '@trpfrog.net/utils'
import { notFound } from 'next/navigation'

import { env } from '@/env/server'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { BlogMarkdown } from '@blog/_components/BlogMarkdown'

import { validateBlogPath } from '../../validate-path'

export async function generateMetadata(
  props: PageProps<'/blog/preview/[...slug]'>,
): Promise<Metadata> {
  const params = await props.params
  if (!env.MICRO_CMS_API_KEY) {
    return {
      title: '記事プレビュー',
      robots: 'noindex, nofollow',
    }
  }
  const client = createPreviewClient({
    apiKey: env.MICRO_CMS_API_KEY,
    serviceDomain: 'trpfrog',
    endpoint: 'blog-preview',
  })

  const entry = await fetchPreviewBlogPost(client, params.slug[0])
  const metadata: Metadata = {
    title: '[記事プレビュー] ' + entry.title,
    robots: 'noindex, nofollow',
    description: entry.description,
  }
  if (entry.thumbnail) {
    metadata.openGraph = {
      images: [{ url: entry.thumbnail }],
    }
  }
  return metadata
}

async function fetchPreviewArticle(previewId: string, page: BlogPageNumber) {
  if (!env.MICRO_CMS_API_KEY) {
    return {
      entry: createErrorArticle('API Key is missing!'),
    }
  }

  const pageNumber = safeValidate(BlogPageNumberSchema, page)
  if (!pageNumber.success) {
    notFound()
  }
  const option = { pagePos1Indexed: pageNumber.output }

  const client = createPreviewClient({
    apiKey: env.MICRO_CMS_API_KEY,
    serviceDomain: 'trpfrog',
    endpoint: 'blog-preview',
  })
  const entry = previewId
    ? ((await fetchPreviewBlogPost(client, previewId, option)) as ErrorablePost)
    : createErrorArticle('ID is missing!')

  return {
    entry,
  }
}

export default async function Index(props: PageProps<'/blog/preview/[...slug]'>) {
  const params = await props.params
  const { slug: previewId, page } = validateBlogPath(params.slug[0], params.slug[1])

  const { entry: post } = await fetchPreviewArticle(previewId, page)

  return (
    <MainWrapper gridLayout>
      <ArticleHeader post={post} addEntryButtons={false} />
      <Block>
        {!post.isError && (
          <p
            style={{
              fontSize: '1.5em',
              color: 'var(--header-color)',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            記事プレビューです
            <br />
            URLを知っているユーザーのみが閲覧できます
          </p>
        )}
      </Block>
      <BlogMarkdown entry={post} />
    </MainWrapper>
  )
}
