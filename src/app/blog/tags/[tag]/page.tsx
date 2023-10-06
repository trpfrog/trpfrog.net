import React from 'react'

import { Button } from '@/components/atoms/Button'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import Title from '@/components/organisms/Title'

import ArticleCard from '@blog/_components/ArticleCard'
import ArticleGrid from '@blog/_components/ArticleGrid'
import { getAllTags, getSortedPostsData } from '@blog/_lib/load'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(t => ({ tag: t.params.tag }))
}

type Props = {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: Props) {
  const tag = decodeURIComponent(params!.tag)
  return {
    title: `タグ「${tag}」の記事一覧 - つまみログ`,
  }
}

export default async function Index({ params }: Props) {
  const tag = decodeURIComponent(params!.tag)
  const articles = await getSortedPostsData(tag)

  return (
    <>
      <MainWrapper>
        <Title>
          <h1>タグ「{tag}」の記事一覧</h1>
          <p>
            <Button href={'/blog'}>記事一覧に戻る</Button>
          </p>
        </Title>

        <ArticleGrid>
          {articles.map(entry => (
            <ArticleCard entry={entry} key={entry.slug} />
          ))}
        </ArticleGrid>
      </MainWrapper>
    </>
  )
}
