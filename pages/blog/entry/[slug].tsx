import React, {CSSProperties, useEffect, useState} from 'react'
import {GetStaticProps, NextPage} from "next";
import Link from 'next/link'
import Image from "next/image";

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";

import {BlogPost, getAllPostSlugs, getPostData} from "../../../lib/blog/load";
import {BlogImageData, fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

import BlogMarkdown, {getPureCloudinaryPath} from "../../../components/blog/BlogMarkdown";
import ArticleBlock from "../../../components/blog/ArticleBlock";
import PageNavigation from "../../../components/blog/PageNavigation";

import styles from '../../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {doMarkdownHMR} from "../../../lib/blog/fileWatch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Tag from "../../../components/blog/Tag";
import {formatReadTime} from "../../../lib/blog/readTime";

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

    const openGraphImage = post.thumbnail ? {
        images: [
            {url: post.thumbnail}
        ]
    } : {}

    const { query } = useRouter()

    if(query.page === 'all') {
        post.content = [post.content.flat()]
    }

    const {
        minutes: readMin,
        seconds: readSec
    } = formatReadTime(post.readTime)

    return (
        <Layout>
            <Title style={{padding: 0, border: '5px solid var(--window-bkg-color)'}}>
                {post.thumbnail &&
                    <Image
                        src={getPureCloudinaryPath(post.thumbnail)}
                        alt={'Thumbnail of this article'}
                        width={1000}
                        height={400}
                        layout={'responsive'}
                        objectFit={'cover'}
                    />
                }
                <div className={styles.inner_title_block}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>
                        <FontAwesomeIcon icon={faCalendarDay}/>{' '}
                        <time dateTime={post.date}>
                            {dayjs(post.date).format('YYYY年M月d日')}
                        </time>
                        {(post.updated && post.date > post.updated) &&
                            <>
                                <br/>
                                <FontAwesomeIcon icon={faSyncAlt}/>{' '}
                                <time dateTime={post.updated}>
                                    {dayjs(post.date).format('YYYY年M月d日')}
                                </time>
                            </>
                        }
                        <br/>
                        <FontAwesomeIcon icon={faClock}/>{' '}
                        予想読了時間 {readMin} 分 {readSec} 秒
                    </p>

                    {/* Tags */}
                    <p>
                        {post.tags
                            .split(',')
                            .map((t: string) => t.trim())
                            .map(tag => (
                                <div
                                    style={{
                                        margin: '3px 3px 0 0',
                                        display: 'inline-block'
                                    }}
                                    key={tag}
                                >
                                    <Tag tag={tag}/>
                                </div>
                            ))
                        }
                    </p>

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
            <BlogMarkdown entry={post} imageSize={post.imageSize}/>
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
