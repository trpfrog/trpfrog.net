import React, {useEffect, useState} from 'react'
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Link from 'next/link'
import Image from "next/image";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

import {BlogPost, getAllPostPaths, getPostData, getSortedPostsData} from "../../lib/blog/load";
import {BlogImageData, fetchAllImageProps} from "../../lib/blog/imagePropsFetcher";

import BlogMarkdown, {getPureCloudinaryPath} from "../../components/blog/BlogMarkdown";

import styles from '../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {doMarkdownHMR} from "../../lib/blog/fileWatch";
import Tag from "../../components/blog/Tag";
import {parseWithBudouX} from "../../lib/wordSplit";
import {parseCookies, setCookie} from "nookies";
import PostAttributes from "../../components/blog/PostAttributes";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faFileLines,
    faFont,
    faPencil, faStar,
    faToiletPaper,
    faUniversalAccess
} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import ArticleCard, {ArticleGrid} from "../../components/blog/ArticleCard";

type PageProps = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
    relatedPosts: BlogPost[]
}

type Params = {
    slug: string[]
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
    const [slug, page] = params!.slug

    const postDataOption = {
        pagePos1Indexed: page ? parseInt(page, 10) : 1,
        all: page === 'all'
    }

    const entry: BlogPost = await getPostData(slug, postDataOption)

    const tags = entry.tags.split(',')[0].trim()
    const relatedPosts: BlogPost[] = tags[0] ? await getSortedPostsData(tags[0]) : []

    const imageSize = await fetchAllImageProps(entry);
    return {
        props: {
            entry: JSON.parse(JSON.stringify(entry)),
            imageSize,
            relatedPosts
        }
    }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    return {
        paths: await getAllPostPaths(),
        fallback: false
    }
}

const share = (slug: string) => {
    if(typeof window === 'undefined') return;
    const articleURL = 'https://trpfrog.net/blog/' + slug
    const tweetURL =  'https://twitter.com/intent/tweet?'
                + "text=" + encodeURIComponent(document.title) + "&"
                + "url=" + encodeURIComponent(articleURL);
    window.open(tweetURL);
}

const TogglePageViewLink = ({post}: {post: BlogPost}) => {
    const router = useRouter()
    const anchor = router.asPath.split('#').slice(-1)[0]

    let previousArticlePage = NaN
    const originalPageAnchor = 'original-page-'
    if (anchor.startsWith(originalPageAnchor)) {
        previousArticlePage = parseInt(anchor.replace(originalPageAnchor, ''), 10)
    }

    let url = `/blog/${post.slug}`
    let text: string
    let icon: IconProp | string

    if (post.isAll) {
        url += '/' + (previousArticlePage || '');
        text = '分割表示'
        icon = faFileLines
    } else {
        url += post.currentPage === 1
            ? '/all'
            : '/all#original-page-' + post.currentPage
        icon = faToiletPaper
        text = '全文表示'
    }

    return (
        <a href={url}>
            <EntryButton icon={icon}>
                {text}
            </EntryButton>
        </a>
    )
}

const EntryButton = (props: {children: React.ReactNode | string, icon: IconProp}) => {
    return (
        <div className={styles.entry_button}>
            <div className={styles.entry_button_icon}>
                <FontAwesomeIcon icon={props.icon}/>
            </div>
            {props.children}
        </div>
    )
}

const Article: NextPage<PageProps> = ({ entry, imageSize, relatedPosts }) => {

    const [post, setPost] = useState({...entry, imageSize})

    // This code is used to reload page automatically on some changes appeared on md files
    if (process.env.NODE_ENV !== 'production') {
        // For development, fetch article data from api
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const f = async () => {
                return await fetch(`/api/posts/${post.slug}/${post.currentPage}`).then((res) =>
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
                        <Link href={'/blog'}>
                            <a>
                                <EntryButton icon={faArrowLeft}>
                                    記事一覧
                                </EntryButton>
                            </a>
                        </Link>
                        <span onClick={() => share(post.slug)}>
                            <EntryButton icon={faTwitter}>
                                ツイート
                            </EntryButton>
                        </span>
                        <Link href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
                            <a>
                                <EntryButton icon={faPencil}>
                                    訂正依頼
                                </EntryButton>
                            </a>
                        </Link>
                        <a onClick={handleUDFontButton}>
                            {useUDFont ? (
                                <EntryButton icon={faFont}>
                                    通常書体
                                </EntryButton>
                            ):(
                                <EntryButton icon={faUniversalAccess}>
                                    UD書体
                                </EntryButton>
                            )}
                        </a>
                        {post.numberOfPages >= 2 && <TogglePageViewLink post={post}/>}
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
            {relatedPosts.length > 0 &&
                <>
                    <div className={styles.hrule_block}>
                        <FontAwesomeIcon icon={faStar}/>{' '}
                        タグ「{post.tags.split(',')[0].trim()}」の記事{' '}
                        <FontAwesomeIcon icon={faStar}/>
                    </div>
                    <ArticleGrid>
                        {relatedPosts.slice(0, 6).map(e => <ArticleCard entry={e} key={e.slug}/>)}
                    </ArticleGrid>
                </>
            }
        </Layout>
    )
}

export default Article
