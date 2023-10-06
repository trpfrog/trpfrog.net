import React from 'react'

import { Metadata } from 'next'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import Title from '@/components/organisms/Title'

import { getTypedEntries } from '@/lib/utils'

import ArticleCard from '@blog/_components/ArticleCard'
import { LiteArticleCard } from '@blog/_components/LiteArticleCard'
import BlogPost from '@blog/_lib/blogPost'
import { getSortedPostsData } from '@blog/_lib/load'
import styles from '@blog/_styles/blog.module.scss'

export const metadata = {
  description:
    'つまみさんのブログです。主にお散歩やソフトウェアの記事を書いています。',
} satisfies Metadata

export default async function Index() {
  const articles = await getSortedPostsData()

  // Get latest featured article
  const latestFeaturedArticleIdx = articles.findIndex((e: BlogPost) => {
    return !!e.thumbnail // We assume that the latest featured article has thumbnail
  })
  const latestFeaturedArticle = articles[latestFeaturedArticleIdx]

  // Remove featured article from articles list if it is the first article
  if (latestFeaturedArticleIdx === 0) {
    articles.splice(latestFeaturedArticleIdx, 1)
  }

  const articlesGroupedByYear = articles.reduce((acc: any, cur: BlogPost) => {
    const year = dayjs(cur.date).format('YYYY')
    if (acc[year] === undefined) acc[year] = []
    acc[year].push(cur)
    return acc
  }, {})

  return (
    <>
      <MainWrapper>
        <Title title={'つまみログ'} description={metadata.description} />

        <div className={styles.hrule_block}>
          <FontAwesomeIcon icon={faStar} /> FEATURED ARTICLE{' '}
          <FontAwesomeIcon icon={faStar} />
        </div>

        <div id={styles.hero_article}>
          <ArticleCard entry={latestFeaturedArticle} hero={true} />
        </div>

        {getTypedEntries(articlesGroupedByYear)
          .reverse()
          .map(([year, articles]) => (
            <React.Fragment key={year as string}>
              <div className={styles.hrule_block}>
                <FontAwesomeIcon icon={faStar} /> {year as string} 年{' '}
                <FontAwesomeIcon icon={faStar} />
              </div>

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 15 }}
              >
                {articles.map((entry: BlogPost) => (
                  <LiteArticleCard entry={entry} key={entry.slug} />
                ))}
              </div>
            </React.Fragment>
          ))}
      </MainWrapper>
    </>
  )
}
