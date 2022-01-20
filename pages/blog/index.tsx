import React, {CSSProperties} from 'react'
import {NextPage} from "next";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";
import {getSortedPostsData, BlogPost} from "../../lib/blog";

import styles from '../../styles/blog/blog.module.scss';
import {NextSeo} from "next-seo";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ArticleBlock from "../../components/blog/ArticleBlock";
import Link from "next/link";

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

    return (
        <>
            <Layout>
                <Title ribbonText={'BETA'}>
                    <h1>つまみログ<span style={{fontSize: '0.5em'}}> on つまみネット</span></h1>
                    <p>つまみさんのブログです。</p>
                    <p>
                        今までのブログを一本化する予定です。今までのブログはこちら
                        <ul>
                            <li><b>ブログ</b>: <a href={'https://trpfrog.hateblo.jp'}>つまみログ</a></li>
                            <li><b>雑ブログ</b>: <a href={'https://old.trpfrog.net/notes'}>Random Notes</a></li>
                        </ul>
                    </p>
                </Title>
                <NextSeo title={'つまみログ'} description={'つまみさんのブログです。'}/>

                <div className={styles.hrule_block}>
                    <FontAwesomeIcon icon={faStar}/> LATEST <FontAwesomeIcon icon={faStar}/>
                </div>

                <Block style={{padding: 0}}>
                    <ArticleBlock entry={latestArticle}/>
                </Block>

                <div className={styles.hrule_block}>
                    <FontAwesomeIcon icon={faStar}/>  OTHER ARTICLES <FontAwesomeIcon icon={faStar}/>
                </div>

                <div id={styles.past_article_grid}>
                    {pastArticles.map(entry => (
                        <div key={entry.slug}>
                            <Block className={styles.article_block} style={{padding: 0}}>
                                <ArticleBlock entry={entry} thinPadding={true}/>
                            </Block>
                        </div>
                    ))}
                </div>
            </Layout>
        </>
    )
}

export default Blog
