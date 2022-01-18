import {
    BlogPost,
    getAllTags,
    getSortedPostsData
} from "../../../lib/blog";
import {GetStaticProps, NextPage} from "next";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import {NextSeo} from "next-seo";
import styles from "../../../styles/blog.module.scss";
import Block from "../../../components/Block";
import Link from "next/link";
import React from "react";
import ArticleBlock from "../../../components/blog/ArticleBlock";

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
