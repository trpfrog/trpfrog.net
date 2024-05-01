import { Metadata } from 'next'

import { fetchPreviewBlogPost, createErrorArticle, ErrorablePost } from '@trpfrog.net/posts/preview'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'

type Props = {
  params: {
    slug: [string, string | undefined]
  }
}

export async function generateMetadata({ params }: Props) {
  const entry = await fetchPreviewBlogPost(params.slug[0])
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

const processSlug = async (slug: [string, string | undefined]) => {
  let [id, page] = slug
  page = page ?? '1'

  const option = {
    pagePos1Indexed: parseInt(page),
    all: page === 'all',
  }

  const entry = id
    ? ((await fetchPreviewBlogPost(id, option)) as ErrorablePost)
    : createErrorArticle('ID is missing!')

  return {
    entry,
  }
}

export default async function Index(props: Props) {
  const { entry: post } = await processSlug(props.params.slug)

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
