import React from 'react'
import Title from "../../components/Title";
import {BlogPost, getSortedPostsData} from "../../lib/blog/load";

import styles from '../../styles/blog/blog.module.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ArticleCard, {ArticleGrid} from "../../components/blog/ArticleCard";


export default async function Index() {
  const articles = await getSortedPostsData()
  const latestLongArticleIdx = articles.findIndex((e: BlogPost) => e.tags.includes("長編記事"))
  const latestLongArticle = articles[latestLongArticleIdx];
  articles.splice(latestLongArticleIdx, 1);
  const otherArticles = articles

  const description =
    'つまみさんのブログです。' +
    '主にお散歩やソフトウェアの記事を書いています。'

  return (
    <>
      <div id="main_wrapper">
        <Title title={'つまみログ'} description={description}/>

        <div className={styles.hrule_block}>
          <FontAwesomeIcon icon={faStar}/> LATEST LONG ARTICLE <FontAwesomeIcon icon={faStar}/>
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
      </div>
    </>
  )
}
