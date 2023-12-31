import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Title } from '@/components/organisms/Title'

import { ArticleCard } from '@blog/_components/ArticleCard'
import { ArticleGrid } from '@blog/_components/ArticleGrid'
import {
  retrieveSortedBlogPostList,
  retrieveExistingAllTags,
} from '@blog/_lib/load'

import { MagicButton } from 'src/components/atoms/MagicButton'

export async function generateStaticParams() {
  const tags = await retrieveExistingAllTags()
  return tags.map(tag => ({
    params: {
      tag,
    },
  }))
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
  const articles = await retrieveSortedBlogPostList(tag)

  return (
    <>
      <MainWrapper gridLayout>
        <Title>
          <h1>タグ「{tag}」の記事一覧</h1>
          <p>
            <MagicButton href={'/blog'}>記事一覧に戻る</MagicButton>
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
