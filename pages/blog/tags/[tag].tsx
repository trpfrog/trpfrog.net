import {BlogImageSize, BlogPost, getAllImageSize, getAllTags, getPostData, getSortedPostsData} from "../../../lib/blog";
import {GetStaticProps, NextPage} from "next";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import {NextSeo} from "next-seo";
import styles from "../../../styles/blog.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faStar, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import Block from "../../../components/Block";
import Link from "next/link";
import {format, parseISO} from "date-fns";
import {TagsBlock} from "../../../lib/blogTag";
import React from "react";

type Props = {
    tag: string
    articles: BlogPost[]
};
type Params = {
    tag: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
    const articles = await getSortedPostsData(params!.tag)
    return {
        props: {
            tag: params!.tag,
            articles: articles.map(r => JSON.parse(JSON.stringify(r)))
        }
    }
}

export const getStaticPaths = async () => {
    const paths = await getAllTags()
    return {
        paths,
        fallback: false
    }
}

const Blog: NextPage<Props> = ({ articles, tag }) => {
    return (
        <>
            <Layout>
                <Title>
                    <h1>タグ「{tag}」の記事一覧</h1>
                    <p>
                        <Link href={'/blog'}>
                            <a className={'linkButton'}>記事一覧に戻る</a>
                        </Link>
                    </p>
                </Title>
                <NextSeo title={`タグ「${tag}」の記事一覧 - つまみログ`}/>

                <div id={styles.past_article_grid}>
                    {articles.map(entry => (
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