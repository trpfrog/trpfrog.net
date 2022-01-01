import React from 'react'
import {NextPage} from "next";
import {Entry} from 'contentful'
import Link from 'next/link'
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";
import {getAllPosts, BlogPost} from "../../lib/blog";

import ReactMarkdown from "react-markdown";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import styles from '../../styles/blog/index.module.scss';

export const getStaticProps = async () => {
    const articles = await getAllPosts();
    return {
        props: {
            articles: articles
        }
    }
}

type Props = {
    articles: Entry<BlogPost>[]
};

const Blog: NextPage<Props> = ({ articles }) => {
    const latestArticle = articles[0];
    const pastArticles = articles.slice(1);

    return (
        <Layout>
            <Title title={'つまみログ'}>
                <p>つまみさんのブログです。</p>
            </Title>

            <Block title={latestArticle.fields.title}>
                <p>
                    {latestArticle.fields.description}
                </p>
                <p>
                    {latestArticle.fields.publishDate}
                </p>
                <p>
                    <Link href={'/blog/posts/' + latestArticle.fields.slug}>
                        <a className={'linkButton'}>記事を読む</a>
                    </Link>
                </p>
            </Block>

            <div id={styles.past_article_grid}>
                {pastArticles.map(entry => (
                    <Block key={entry.fields.slug} title={entry.fields.title}>
                        <p>
                            {entry.fields.description}
                        </p>
                        <p>
                            {entry.fields.publishDate}
                        </p>
                        <Link href={'/blog/posts/' + entry.fields.slug}>
                            <a className={'linkButton'}>記事を読む</a>
                        </Link>
                    </Block>
                ))}
            </div>

        </Layout>
    )
}

export default Blog