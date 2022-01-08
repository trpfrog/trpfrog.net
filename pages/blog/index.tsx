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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faStar, faSyncAlt} from "@fortawesome/free-solid-svg-icons";

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

                <div className={styles.hrule_block}>
                    <FontAwesomeIcon icon={faStar}/> LATEST <FontAwesomeIcon icon={faStar}/>
                </div>

                <Block>
                    <h2 className={'none'}>
                        <Link href={'/blog/entry/' + latestArticle.slug}>
                            <a>{latestArticle.title}</a>
                        </Link>
                    </h2>
                    <p>
                        <FontAwesomeIcon icon={faCalendarDay}/>{' '}
                        <time dateTime={latestArticle.date}>
                            {format(parseISO(latestArticle.date), 'LLLL d, yyyy')}
                        </time>
                        {
                            (latestArticle.updated && latestArticle.date != latestArticle.updated) &&
                            <>
                                <br/>
                                <FontAwesomeIcon icon={faSyncAlt}/>{' '}
                                <time dateTime={latestArticle.updated}>
                                    {format(parseISO(latestArticle.updated), 'LLLL d, yyyy')}
                                </time>
                            </>
                        }
                    </p>
                    <p>
                        {latestArticle.description}
                    </p>
                    <TagsBlock tags={latestArticle.tags}/>
                </Block>

                <div className={styles.hrule_block}>
                    <FontAwesomeIcon icon={faStar}/>  OTHER ARTICLES <FontAwesomeIcon icon={faStar}/>
                </div>

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
                                    <FontAwesomeIcon icon={faCalendarDay}/>{' '}
                                    <time dateTime={entry.date}>
                                        {format(parseISO(entry.date), 'LLLL d, yyyy')}
                                    </time>
                                    {
                                        (entry.updated && entry.date != entry.updated) &&
                                        <>
                                            <br/>
                                            <FontAwesomeIcon icon={faSyncAlt}/>{' '}
                                            <time dateTime={entry.updated}>
                                                {format(parseISO(entry.updated), 'LLLL d, yyyy')}
                                            </time>
                                        </>
                                    }
                                </p>
                                <p>
                                    {entry.description}
                                </p>
                                <TagsBlock tags={entry.tags}/>
                            </Block>
                        </div>
                    ))}
                </div>
            </Layout>
        </>
    )
}

export default Blog
