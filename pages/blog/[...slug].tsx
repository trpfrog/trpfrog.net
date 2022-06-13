import React, {useContext, useEffect, useState} from 'react'
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Link from 'next/link'
import Image from "next/image";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

import {
    BlogPost,
    fetchHistorySHA,
    getAllPostPaths,
    getPostData,
    getSortedPostsData, TimeMachineSHA
} from "../../lib/blog/load";
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
import RelatedPosts from "../../components/blog/RelatedPosts";
import TimeMachine from "../../components/blog/TimeMachine";
import PageNavigation from "../../components/blog/PageNavigation";
import {HeaderFollowSticky} from "../../components/header/Header";
import ArticleCard from "../../components/blog/ArticleCard";

type PageProps = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
    relatedPosts: BlogPost[]
    pastArticleSHA: TimeMachineSHA[]
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

    return {
        props: {
            entry: JSON.parse(JSON.stringify(entry)),
            imageSize: await fetchAllImageProps(entry),
            relatedPosts,
            pastArticleSHA: await fetchHistorySHA(slug)
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
    return (
        <div className={styles.entry_button} onClick={props.onClick}>
            <div className={styles.entry_button_icon}>
                <FontAwesomeIcon icon={props.icon}/>
            </div>
            <span className={styles.entry_button_text}>
                {props.text}
            </span>
        </div>
    )
}

const Article: NextPage<PageProps> = ({ entry, imageSize, relatedPosts, pastArticleSHA }) => {

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
    const [badButtonFlag, setBadButtonFlag] = useState(false)
    const handleBadBlog = () => {
        setBadButtonFlag(true)
        if (badBlog) {
            setBadBlog(0)
        } else {
            setBadBlog(Math.ceil(Math.random() * badBlogs.length))
        }
    }

    return (
        <Layout className={styles.layout}>
            <Title className={styles.article_title_block}>
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
                                <span
                                    style={{
                                        margin: '3px 3px 0 0',
                                        display: 'inline-block'
                                    }}
                                    key={tag}
                                >
                                    <Tag tag={tag}/>
                                </span>
                            ))
                        }
                    </p>

                    <div id={styles.entry_top_buttons}>
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
                    </div>

                    {process.env.NODE_ENV === 'development' &&
                        <p>
                            <a
                                className={'linkButton'}
                                onClick={() => fetch(`/api/posts/open/${post.slug}`)}
                            >
                                編集する
                            </a>
                        </p>
                    }

                    {pastArticleSHA.length > 1 &&
                        <div style={{margin: '1em 0'}}>
                            <TimeMachine
                                setPost={setPost}
                                originalEntry={entry}
                                imageSize={imageSize}
                                pastArticleSHA={pastArticleSHA}
                            />
                        </div>
                    }

                    <div>
                        <p style={badButtonFlag ? {} : {opacity: 0.05, height: 2, margin: 0}} >
                            <a className={'linkButton'} onClick={handleBadBlog}>
                                {badBlog ? '元に戻す' : 'よくないブログ'}
                            </a>
                        </p>
                        {badBlog > 0 &&
                            <p>
                                よくないブログ No.{badBlog}: <b>{badBlogs[badBlog - 1]}</b>
                            </p>
                        }
                    </div>

                </div>
            </Title>
            <NextSeo
                title={`${post.title} - つまみログ`}
                description={post.description}
                openGraph={openGraphImage}
            />

            <div className={styles.main_content}>
                <div className={styles.article_wrapper}>
                    <div
                        className={styles.bad_blog_wrapper}
                        data-bad-blog={badBlog}
                    >
                        <BlogMarkdown
                            entry={post}
                            imageSize={post.imageSize}
                            className={useUDFont ? styles.with_ud_font : ''}
                        />
                    </div>
                </div>
                <aside>
                    <HeaderFollowSticky top={'1em'}>
                        <ArticleCard
                            entry={entry}
                            style={{
                                pointerEvents: 'none',
                                borderRadius: 30,
                                marginBottom: '1em'
                            }}
                        />
                        <Block className={styles.blog_side_bar} style={{padding: '1.5em 0.5em'}}>
                            <div style={{transform: 'scale(0.9)', transformOrigin: 'top'}}>
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
                                <div style={{height: '1em'}}/>
                                <PageNavigation entry={post}/>
                            </div>
                            <div style={{width: '90%', margin: 'auto'}}>
                                <TimeMachine
                                    setPost={setPost}
                                    originalEntry={entry}
                                    imageSize={imageSize}
                                    pastArticleSHA={pastArticleSHA}
                                />
                            </div>
                        </Block>
                    </HeaderFollowSticky>
                </aside>
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
            <RelatedPosts
                tag={post.tags.split(',')[0].trim()}
                relatedPosts={relatedPosts}
            />
        </Layout>
    )
}

export default Article
