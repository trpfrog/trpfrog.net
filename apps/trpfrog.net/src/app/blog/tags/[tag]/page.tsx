import { readAllBlogPosts, retrieveExistingAllTags } from '@trpfrog.net/posts/fs'
import Link from 'next/link'
import { RichButton } from 'src/components/atoms/RichButton'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Title } from '@/components/organisms/Title'

import { ArticleCard } from '@blog/_components/ArticleCard'
import { ArticleGrid } from '@blog/_components/ArticleGrid'

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
  const articles = await readAllBlogPosts({ tag })

  return (
    <>
      <MainWrapper gridLayout>
        <Title>
          <h1>タグ「{tag}」の記事一覧</h1>
          <p>
            <RichButton as={Link} href={'/blog'}>
              記事一覧に戻る
            </RichButton>
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
