import React from 'react'
import {NextPage} from "next";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import {getSortedPostsData, BlogPost} from "../../lib/blog/load";

import styles from '../../styles/blog/blog.module.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ArticleCard, {ArticleGrid} from "../../components/blog/ArticleCard";

export const getStaticProps = async () => {
    const articles = await getSortedPostsData()
    return {
        props: {
            // to avoid error, convert article struct into string
            articles: articles.map(r => JSON.parse(JSON.stringify(r)))
        }
    }
}

type Props = {
    articles: BlogPost[]
};

const Blog: NextPage<Props> = ({ articles }) => {
    const latestArticle = articles[0];
    const pastArticles = articles.slice(1);

    const description =
        'つまみさんのブログです。' +
        '主にお散歩やソフトウェアの記事を書いています。'

    return (
        <>
            <Layout>
                <Title title={'つまみログ'} description={description} />

                <div className={styles.hrule_block}>
                    <FontAwesomeIcon icon={faStar}/> LATEST <FontAwesomeIcon icon={faStar}/>
                </div>

                <div id={styles.hero_article}>
                    <ArticleCard entry={latestArticle} hero={true}/>
                </div>

                <div className={styles.hrule_block}>
                    <FontAwesomeIcon icon={faStar}/>  OTHER ARTICLES <FontAwesomeIcon icon={faStar}/>
                </div>

                <ArticleGrid>
                    {pastArticles.map(entry => <ArticleCard entry={entry} key={entry.slug}/>)}
                </ArticleGrid>
            </Layout>
        </>
    )
}

export default Blog
