import React from 'react'
import {NextPage} from "next";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import {BlogPost, getSortedPostsData} from "../../lib/blog/load";

import styles from '../../styles/blog/blog.module.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ArticleCard, {ArticleGrid} from "../../components/blog/ArticleCard";

export const getStaticProps = async () => {
  const articles = await getSortedPostsData()
  const latestLongArticleIdx = articles.findIndex((e: BlogPost) => e.tags.includes("長編記事"))
  const latestLongArticle = articles[latestLongArticleIdx];
  articles.splice(latestLongArticleIdx, 1);
  return {
    props: {
      latestLongArticle,
      otherArticles: articles
    }
  }
}

type Props = {
  latestLongArticle: BlogPost,
  otherArticles: BlogPost[]
};

const Blog: NextPage<Props> = ({latestLongArticle, otherArticles}) => {
  const description =
    'つまみさんのブログです。' +
    '主にお散歩やソフトウェアの記事を書いています。'

  return (
    <>
      <Layout>
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
      </Layout>
    </>
  )
}

export default Blog
