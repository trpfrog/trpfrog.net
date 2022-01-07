import React from 'react'
import {NextPage} from "next";
import {Entry} from 'contentful'
import Link from 'next/link'
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";
import {getSortedPostsData, BlogPost, getAllPostSlugs} from "../../lib/blog";

import styles from '../../styles/blog.module.scss';
import {NextSeo} from "next-seo";

export const getStaticProps = async () => {
    const articles = await getSortedPostsData()
    return {
        props: {
            // avoiding error
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

                <Block title={latestArticle.title} h2icon={'none'} ribbonText={'NEW!'}>
                    <p>
                        {latestArticle.description}
                    </p>
                    <p>
                        {latestArticle.date}
                    </p>
                    <p>
                        <Link href={'/blog/entry/' + latestArticle.slug}>
                            <a className={'linkButton'}>記事を読む</a>
                        </Link>
                    </p>
                </Block>

                <div id={styles.past_article_grid}>
                    {pastArticles.map(entry => (
                        <div key={entry.slug}>
                            <Block title={entry.title} h2icon={'none'}>
                                <p>
                                    {entry.description}
                                </p>
                                <p>
                                    {entry.date}
                                </p>
                                <p>
                                    <Link href={'/blog/entry/' + entry.slug}>
                                        <a className={'linkButton'}>記事を読む</a>
                                    </Link>
                                </p>
                            </Block>
                        </div>
                    ))}
                </div>
            </Layout>
        </>
    )
}

export default Blog
