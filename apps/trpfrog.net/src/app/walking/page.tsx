import { Metadata } from 'next'

import { BlogPost } from '@trpfrog.net/posts'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import { ArticleCard } from '@blog/_components/ArticleCard'
import { ArticleGrid } from '@blog/_components/ArticleGrid'
import { fetchPostList } from '@blog/rpc'

// FIXME: Cannot find module 'Belongings.mdx'
// @ts-expect-error - Error: Cannot find module 'Belongings.mdx''
import Belongings from './Belongings.mdx'

export const metadata = {
  title: 'Walking',
  description: '長距離を歩いて移動することは面白いと言われています。',
} satisfies Metadata

export default async function Index() {
  const articles = await fetchPostList('徒歩')
  return (
    <MainWrapper gridLayout>
      <Title title={metadata.title} description={metadata.description} />
      <Block title={'新着徒歩記事'}>
        <p>
          つまみログに書いた「<b>徒歩</b>」タグの新着記事です。
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
