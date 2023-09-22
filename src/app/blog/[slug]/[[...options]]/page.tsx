import React from 'react'

import { Metadata } from 'next'

import MainWrapper from '@/components/atoms/MainWrapper'
import Block from '@/components/molecules/Block'

import ArticleHeader from '@blog/_components/ArticleHeader'
import { BadBlogBlock } from '@blog/_components/BadBlog'
import RelatedPosts from '@blog/_components/RelatedPosts'
import { UDFontBlock } from '@blog/_components/UDFontBlock'
import BlogPost from '@blog/_lib/blogPost'
import { fetchAllImageProps } from '@blog/_lib/imagePropsFetcher'
import { getPostData, getSortedPostsData } from '@blog/_lib/load'
import BlogMarkdown from '@blog/_renderer/BlogMarkdown'
import styles from '@blog/_styles/blog.module.scss'

import ArticleSidebar from './_components/ArticleSidebar'
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
  const entry = await getPostData(slug)
  const paths = []
  for (let i = 1; i <= entry.numberOfPages; i++) {
    paths.push({ options: [i + ''] })
  }
  paths.push({ options: ['all'] })
  paths.push({ options: undefined })
  return paths
}

export async function generateMetadata({ params }: PageProps) {
  const { title, description, thumbnail } = await getPostData(params.slug)

  const metadata: Metadata = {
    title,
    description,
  }

  if (thumbnail) {
    metadata.openGraph = {
      images: [{ url: thumbnail }],
    }
  }
  return metadata
}

const processSlug = async (slug: string, page?: string) => {
  const postDataOption = {
    pagePos1Indexed: page ? parseInt(page, 10) : 1,
    all: page === 'all',
  }

  const entry: BlogPost = await getPostData(slug, postDataOption)

  const tags = entry.tags.split(',')[0].trim()
  const relatedPosts: BlogPost[] = !tags[0]
    ? []
    : (await getSortedPostsData(tags[0])).filter(
        (e: BlogPost) => e.slug !== entry.slug,
      )

  return {
    entry: JSON.parse(JSON.stringify(entry)) as BlogPost,
    imageSize: await fetchAllImageProps(entry, false),
    relatedPosts,
  }
}

export default async function Index({ params: { slug, options } }: PageProps) {
  const page = options?.[0]

  const { entry: post, imageSize, relatedPosts } = await processSlug(slug, page)

  return (
    <MainWrapper className={styles.layout}>
      <ArticleHeader post={post} />
      <div className={styles.main_content}>
        <div className={styles.article_wrapper}>
          <UDFontBlock>
            <BadBlogBlock>
              <BlogMarkdown entry={post} imageSize={imageSize} />
            </BadBlogBlock>
          </UDFontBlock>
        </div>
        <aside>
          <ArticleSidebar post={post} />
        </aside>
      </div>

      <Block id={styles.entry_bottom_buttons}>
        <EntryButtons post={post} />
      </Block>
      <RelatedPosts
        tag={post.tags.split(',')[0].trim()}
        relatedPosts={relatedPosts}
      />
    </MainWrapper>
  )
}
