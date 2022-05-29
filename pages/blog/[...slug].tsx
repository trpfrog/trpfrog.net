import React, {CSSProperties, useEffect, useState} from 'react'
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
    faPencil, faStar, faThumbsUp,
    faToiletPaper,
    faUniversalAccess, faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import ArticleCard, {ArticleGrid} from "../../components/blog/ArticleCard";
import Util from "../../lib/utils";

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
    const relatedPosts: BlogPost[] = !tags[0] ? []
        : (await getSortedPostsData(tags[0]))
            .filter((e: BlogPost) => e.slug !== entry.slug)

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
            <EntryButton icon={icon} text={text} />
        </a>
    )
}

const EntryButton = (props: {text: string, icon: IconProp, onClick?: any}) => {
    const fontName = 'M PLUS Rounded 1c'
    const maxLenTextWidth = Util.getTextWidth('おさかな', fontName) * 1.48
    const textWidth = Util.getTextWidth(props.text, fontName) * 1.48
    const windowSize = Util.useWindowSize()
    return (
        <div className={styles.entry_button} onClick={props.onClick}>
            <div className={styles.entry_button_icon}>
                <FontAwesomeIcon icon={props.icon}/>
            </div>
            <span className={styles.entry_button_text} style={
                {
                    transform: `scaleX(${Math.min(maxLenTextWidth / textWidth, 1)}) translateX(${
                        -textWidth / 2 * (windowSize.width < 800 ? 0.78 : 1)
                    }px)`,
                }
            }>
                {props.text}
            </span>
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

    const badBlogs = [
        'ebioishii_u',
        'コントラストがカス',
        '赤が色褪せている',
        '画像が散らかっている',
        'ぐるぐる'
    ]
    const [badBlog, setBadBlog] = useState(0)
    const handleBadBlog = () => {
        if (badBlog) {
            setBadBlog(0)
        } else {
            setBadBlog(Math.ceil(Math.random() * badBlogs.length))
        }
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
                                <EntryButton icon={faArrowLeft} text={'記事一覧'}/>
                            </a>
                        </Link>
                        <span onClick={() => share(post.slug)}>
                            <EntryButton icon={faTwitter} text={'ツイート'}/>
                        </span>
                        <Link href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
                            <a>
                                <EntryButton icon={faPencil} text={'訂正依頼'}/>
                            </a>
                        </Link>
                        <a onClick={handleUDFontButton}>
                            {useUDFont ? (
                                <EntryButton icon={faFont} text={'通常書体'}/>
                            ):(
                                <EntryButton icon={faUniversalAccess} text={'UD書体'}/>
                            )}
                        </a>
                        {post.numberOfPages >= 2 && <TogglePageViewLink post={post}/>}
                        {badBlog ? (
                            <EntryButton icon={faThumbsUp} text={'元に戻す'} onClick={handleBadBlog}/>
                        ) : (
                            <EntryButton icon={faXmarkCircle} text={'よくないブログ'} onClick={handleBadBlog}/>
                        )}
                    </p>

                    {badBlog > 0 &&
                        <p>
                            よくないブログ No.{badBlog}: <b>{badBlogs[badBlog - 1]}</b>
                        </p>
                    }

                </div>
            </Title>
            <NextSeo
                title={`${post.title} - つまみログ`}
                description={post.description}
                openGraph={openGraphImage}
            />
            <div
                className={badBlog ? styles.bad_blog_wrapper : ''}
                data-bad-blog={badBlog}
            >
                <BlogMarkdown
                    entry={post}
                    imageSize={post.imageSize}
                    className={useUDFont ? styles.with_ud_font : ''}
                />
            </div>
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
                        タグ「{post.tags.split(',')[0].trim()}」の新着記事{' '}
                        <FontAwesomeIcon icon={faStar}/>
                    </div>
                    <ArticleGrid>
                        {relatedPosts.slice(0, 6).map((e, idx) => (
                            <div key={e.slug} className={idx > 2 ? 'only-on-pc' : ''}>
                                <ArticleCard entry={e}/>
                            </div>
                        ))}
                    </ArticleGrid>
                    {relatedPosts.length > 6 &&
                        <div style={{textAlign: 'center'}} className={'only-on-pc'}>
                            <Link href={'/blog/tags/' + post.tags.split(',')[0].trim()}>
                                <a className={'linkButton'}>
                                    もっと見る (さらに {relatedPosts.length - 6} 件の記事)
                                </a>
                            </Link>
                        </div>
                    }
                    {relatedPosts.length > 3 &&
                        <div style={{textAlign: 'center'}} className={'only-on-sp'}>
                            <Link href={'/blog/tags/' + post.tags.split(',')[0].trim()}>
                                <a className={'linkButton'}>
                                    もっと見る (さらに {relatedPosts.length - 3} 件の記事)
                                </a>
                            </Link>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default Article
