import React from 'react'
import {NextPage} from "next";
import Link from 'next/link'
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";
import {getSortedPostsData, BlogPost, getAllPostSlugs} from "../../lib/blog";

import styles from '../../styles/blog.module.scss';
import {NextSeo} from "next-seo";

import {parseISO, format} from 'date-fns'
import {TagsBlock} from "../../lib/blogTag";

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

                <p style={{textAlign: 'center'}}>
                    LATEST TOPIC
                </p>

                <Block>
                    <h2 className={'none'}>
                        <Link href={'/blog/entry/' + latestArticle.slug}>
                            <a>{latestArticle.title}</a>
                        </Link>
                    </h2>
                    <p>
                        {latestArticle.description}
                    </p>
                    <TagsBlock tags={latestArticle.tags}/>
                    <p>
                        <time dateTime={latestArticle.date}>
                            {format(parseISO(latestArticle.date), 'LLLL d, yyyy')}
                        </time>
                    </p>
                </Block>

                <p style={{textAlign: 'center'}}>
                    BACK NUMBER
                </p>

                <div id={styles.past_article_grid}>
                    {pastArticles.map(entry => (
                        <div key={entry.slug}>
                            <Block className={styles.article_block}>
                                <h2 className={'none'}>
                                    <Link href={'/blog/entry/' + entry.slug}>
                                        <a>{entry.title}</a>
                                    </Link>
                                </h2>
                                <p>
                                    {entry.description}
                                </p>
                                <TagsBlock tags={entry.tags}/>
                                <p>
                                    <time dateTime={entry.date}>
                                        {format(parseISO(entry.date), 'LLLL d, yyyy')}
                                    </time>
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
