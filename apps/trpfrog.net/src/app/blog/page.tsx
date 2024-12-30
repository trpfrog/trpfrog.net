import { Fragment } from 'react'

import { Metadata } from 'next'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { BlogPost } from '@trpfrog.net/posts'
import { getYear } from 'date-fns'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { OnBodyHeading } from '@/components/atoms/OnBodyHeading'
import { Title } from '@/components/organisms/Title'

import { getTypedEntries } from '@/lib/utils'

import { ArticleCard } from '@blog/_components/ArticleCard'
import { LiteArticleCard } from '@blog/_components/LiteArticleCard'
import styles from '@blog/_styles/blog.module.css'
import { fetchPostList } from '@blog/rpc'

export const metadata = {
  description: 'つまみさんのブログです。主にお散歩やソフトウェアの記事を書いています。',
} satisfies Metadata

export default async function Index() {
  const articles = await fetchPostList()

  // Get latest featured article
  const latestFeaturedArticleIdx = articles.findIndex((e: BlogPost) => {
    return !!e.thumbnail // We assume that the latest featured article has thumbnail
  })
  const latestFeaturedArticle = articles[latestFeaturedArticleIdx]

  // Remove featured article from articles list if it is the first article
  if (latestFeaturedArticleIdx === 0) {
    articles.splice(latestFeaturedArticleIdx, 1)
  }

  const articlesGroupedByYear = articles.reduce(
    (acc, cur) => {
      const year = getYear(cur.date).toString()
      if (acc[year] === undefined) acc[year] = []
      acc[year].push(cur)
      return acc
    },
    {} as Record<string, BlogPost[]>,
  )

  return (
    <>
      <MainWrapper gridLayout>
        <Title title="Blog" description={metadata.description} />

        <OnBodyHeading icon={faStar}>FEATURED ARTICLE</OnBodyHeading>

        <div id={styles.hero_article}>
          <ArticleCard entry={latestFeaturedArticle} hero={true} />
        </div>

        {getTypedEntries(articlesGroupedByYear)
          .reverse()
          .map(([year, articles]) => (
            <Fragment key={year as string}>
              <OnBodyHeading icon={faStar}>{year as string} 年</OnBodyHeading>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                {articles.map((entry: BlogPost) => (
                  <LiteArticleCard entry={entry} key={entry.slug} />
                ))}
              </div>
            </Fragment>
          ))}
      </MainWrapper>
    </>
  )
}
