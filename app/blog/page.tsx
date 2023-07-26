import React from 'react'
import Title from "@/components/Title";
import {getSortedPostsData} from "@blog/_lib/load";

import styles from '@blog/_styles/blog.module.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ArticleCard from "@blog/_components/ArticleCard";
import BlogPost from "@blog/_lib/blogPost";
import {Metadata} from "next";
import MainWrapper from "@/components/MainWrapper";
import ArticleGrid from "@blog/_components/ArticleGrid";

export const metadata = {
  description: 'つまみさんのブログです。主にお散歩やソフトウェアの記事を書いています。'
} satisfies Metadata

export default async function Index() {
  const articles = await getSortedPostsData()
  const latestLongArticleIdx = articles.findIndex((e: BlogPost) => e.tags.includes("長編記事"))
  const latestLongArticle = articles[latestLongArticleIdx];
  articles.splice(latestLongArticleIdx, 1);
  const otherArticles = articles

  return (
    <>
      <MainWrapper>
        <Title title={'つまみログ'} description={metadata.description}/>

        <div className={styles.hrule_block}>
          <FontAwesomeIcon icon={faStar}/> FEATURED ARTICLE <FontAwesomeIcon icon={faStar}/>
        </div>

        <div id={styles.hero_article}>
          <ArticleCard entry={latestLongArticle} hero={true}/>
        </div>

        <div className={styles.hrule_block}>
          <FontAwesomeIcon icon={faStar}/> OTHER ARTICLES <FontAwesomeIcon icon={faStar}/>
        </div>

        <ArticleGrid>
          {otherArticles.map(entry => <ArticleCard entry={entry} key={entry.slug}/>)}
        </ArticleGrid>
      </MainWrapper>
    </>
  )
}
