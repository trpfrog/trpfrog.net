import Title from '@/components/Title'
import Block from '@/components/molecules/Block'

import { getSortedPostsData } from '@blog/_lib/load'
import ArticleCard from '@blog/_components/ArticleCard'
import Belongings from './Belongings.mdx'
import BlogPost from '@blog/_lib/blogPost'
import { Metadata } from 'next'
import MainWrapper from '@/components/MainWrapper'
import ArticleGrid from '@blog/_components/ArticleGrid'

export const metadata = {
  title: '徒歩情報',
  description: '長距離を歩いて移動することは面白いと言われています。',
} satisfies Metadata

export default async function Index() {
  const tag = '徒歩'
  const articles = await getSortedPostsData(tag)

  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description} />
      <Block title={'新着徒歩記事'}>
        <p>
          つまみログに書いた「<b>徒歩</b>」タグの新着記事です。
          その他の徒歩記事は <a href={'https://walk.trpfrog.net'}>WALKICLES</a>{' '}
          をご覧ください。
        </p>
      </Block>
      <ArticleGrid>
        {articles.slice(0, 6).map((entry: BlogPost) => (
          <ArticleCard entry={entry} key={entry.slug} />
        ))}
      </ArticleGrid>
      <Block title={'持ち物'}>
        <Belongings />
      </Block>
    </MainWrapper>
  )
}
