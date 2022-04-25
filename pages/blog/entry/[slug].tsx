import React, {useEffect, useState} from 'react'
import {GetStaticProps, NextPage} from "next";
import Link from 'next/link'
import Image from "next/image";

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";

import {BlogPost, getAllPostSlugs, getPostData} from "../../../lib/blog/load";
import {BlogImageData, fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

import BlogMarkdown, {getPureCloudinaryPath} from "../../../components/blog/BlogMarkdown";

import styles from '../../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {doMarkdownHMR} from "../../../lib/blog/fileWatch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock, faFlask, faImages, faSyncAlt, faWalking} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Tag from "../../../components/blog/Tag";
import {formatReadTime} from "../../../lib/blog/readTime";
import {parseWithBudouX} from "../../../lib/wordSplit";
import {destroyCookie, parseCookies, setCookie} from "nookies";
import PostAttributes from "../../../components/blog/PostAttributes";

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

    const cookies = parseCookies()
    const cookieNameUD = 'useUDFonts'
    const [useUDFont, setUseUDFont] = useState(false)
    useEffect(() => {
        setUseUDFont(cookies[cookieNameUD] === 'true')
    }, [])

    const handleUDFontButton = () => {
        console.log(useUDFont)
        if (useUDFont) {
            setCookie(null, cookieNameUD, 'false', {
                maxAge: 1,
                path: '/',
            })
        } else {
            setCookie(null, cookieNameUD, 'true', {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
        }
        setUseUDFont(!useUDFont)
    }

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
                    <h1>{parseWithBudouX(post.title, post.slug)}</h1>
                    <p style={{margin: '1em'}}>{post.description}</p>
                    <PostAttributes post={post}/>

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
                            <a onClick={handleUDFontButton}>
                                {useUDFont ? '通常フォントに戻す' : (
                                    <>
                                        <FontAwesomeIcon icon={faFlask}/>
                                        <span style={{width: 5}}/>
                                        UDフォントで見てみる
                                    </>
                                )}
                            </a>
                        </p>
                    </p>
                </div>
            </Title>
            <NextSeo
                title={`${post.title} - つまみログ`}
                description={post.description}
                openGraph={openGraphImage}
            />
            <BlogMarkdown
                entry={post}
                imageSize={post.imageSize}
                className={useUDFont ? styles.with_ud_font : ''}
            />
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
