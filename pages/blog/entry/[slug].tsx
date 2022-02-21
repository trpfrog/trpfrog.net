import React, {CSSProperties, useEffect, useState} from 'react'
import {GetStaticProps, NextPage} from "next";
import Link from 'next/link'

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";

import {BlogPost, getAllPostSlugs, getPostData} from "../../../lib/blog";
import {BlogImageData, fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

import BlogMarkdown from "../../../components/blog/BlogMarkdown";
import ArticleBlock from "../../../components/blog/ArticleBlock";
import PageNavigation from "../../../components/blog/PageNavigation";

import styles from '../../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {doMarkdownHMR} from "../../../lib/blog/fileWatch";

type PageProps = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
}

type Params = {
    slug: string
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
    const entry = await getPostData(params!.slug)
    const imageSize = await fetchAllImageProps(entry);
    return {
        props: {
            entry: JSON.parse(JSON.stringify(entry)),
            imageSize
        }
    }
}

export const getStaticPaths = async () => {
    const paths = await getAllPostSlugs()
    return {
        paths,
        fallback: false
    }
}

const share = (slug: string) => {
    if(typeof window === 'undefined') return;
    const articleURL = 'https://trpfrog.net/blog/entry/' + slug
    const tweetURL =  'https://twitter.com/intent/tweet?'
                + "text=" + encodeURIComponent(document.title) + "&"
                + "url=" + encodeURIComponent(articleURL);
    window.open(tweetURL);
}

const Article: NextPage<PageProps> = ({ entry, imageSize }) => {

    const [post, setPost] = useState({...entry, imageSize})

    // This code is used to reload page automatically on some changes appeared on md files
    if (process.env.NODE_ENV !== 'production') {
        // For development, fetch article data from api
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const f = async () => {
                return await fetch(`/api/posts/${post.slug}`).then((res) =>
                    res.json()
                )
            }
            f().then(r => setPost(r))
        }, [])
        doMarkdownHMR()
    }

    const thumbnailStyle: CSSProperties = post.thumbnail ? {
        backgroundImage: `url(${post.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {}

    const openGraphImage = post.thumbnail ? {
        images: [
            {url: post.thumbnail}
        ]
    } : {}

    const { query } = useRouter()
    const validatePagePosition = (x: number) => Math.floor(Math.max(0, Math.min(post.content.length, x) - 1))
    const pagePosition = validatePagePosition(parseInt(query.page as string ?? '1'))

    if(query.page === 'all') {
        post.content = [post.content.join('\n')]
    }

    return (
        <Layout>
            <Title style={{...thumbnailStyle, padding: 0}}>
                <div className={styles.inner_title_block}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <ArticleBlock entry={post} showTitle={false} showDescription={false} showBackground={false}/>
                    <p id={styles.entry_top_buttons}>
                        <p className={'link-area'}>
                            <Link href={'/blog'}>
                                <a>記事一覧</a>
                            </Link>
                            <span onClick={() => share(post.slug)}>
                                    <a>ツイート</a>
                                </span>
                            <Link href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
                                <a>訂正リクエスト</a>
                            </Link>
                        </p>
                    </p>
                </div>
            </Title>
            <NextSeo
                title={`${post.title} - つまみログ`}
                description={post.description}
                openGraph={openGraphImage}
            />
            <Block>
                <PageNavigation entry={post} pagePosition={pagePosition} doNotShowOnFirst={true}/>
                <BlogMarkdown entry={post} imageSize={post.imageSize}/>
                <PageNavigation entry={post} pagePosition={pagePosition}/>
            </Block>
            <Block id={styles.entry_bottom_buttons}>
                <p className={'link-area'} style={{textAlign: 'center'}}>
                    <Link href={'/blog'}>
                        <a>記事一覧</a>
                    </Link>
                    <span onClick={() => share(post.slug)}>
                        <a>ツイート</a>
                    </span>
                    <Link href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
                        <a>訂正リクエスト</a>
                    </Link>
                </p>
            </Block>
        </Layout>
    )
}

export default Article
