import React from 'react'
import Image from 'next/legacy/image'

import Title from '@/components/Title'

import { getPreviewPostData } from '@blog/_lib/loadPreview'
import { fetchAllImageProps } from '@blog/_lib/imagePropsFetcher'

import BlogMarkdown from '@blog/_renderer/BlogMarkdown'

import styles from '@blog/_styles/blog.module.scss'

import { formatReadTime } from '@blog/_lib/readTime'
import { parseWithBudouX } from '@/lib/wordSplit'
import PostAttributes from '@blog/_components/PostAttributes'
import { createErrorArticle, ErrorablePost } from '@blog/_lib/loadPreview'
import { getPureCloudinaryPath } from '@blog/_lib/getPureCloudinaryPath'
import { Metadata } from 'next'
import MainWrapper from '@/components/MainWrapper'

type Props = {
  params: {
    slug: [string, string | undefined]
  }
}

export async function generateMetadata({ params }: Props) {
  const entry = await getPreviewPostData(params.slug[0])
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
    ? ((await getPreviewPostData(id, option)) as ErrorablePost)
    : createErrorArticle('ID is missing!')
  const imageSize = entry.isError ? {} : await fetchAllImageProps(entry)
  return {
    entry: JSON.parse(JSON.stringify(entry)),
    imageSize,
  }
}

export default async function Index(props: Props) {
  const { entry: post, imageSize } = await processSlug(props.params.slug)

  const { minutes: readMin, seconds: readSec } = formatReadTime(post.readTime)

  return (
    <MainWrapper>
      <Title
        style={{ padding: 0, border: '5px solid var(--window-bkg-color)' }}
      >
        {post.thumbnail && (
          <Image
            src={getPureCloudinaryPath(post.thumbnail)}
            alt={'Thumbnail of this article'}
            width={1000}
            height={400}
            layout={'responsive'}
            objectFit={'cover'}
          />
        )}
        <div className={styles.inner_title_block}>
          <h1>{parseWithBudouX(post.title, post.slug)}</h1>
          <p>{post.description}</p>
          {!post.isError && (
            <p
              style={{
                fontSize: '1.5em',
                color: 'var(--header-color)',
                fontWeight: 'bold',
              }}
            >
              記事プレビューです
              <br />
              URLを知っているユーザーのみが閲覧できます
            </p>
          )}
          <PostAttributes post={post} />
        </div>
      </Title>
      <BlogMarkdown entry={post} imageSize={imageSize} />
    </MainWrapper>
  )
}
