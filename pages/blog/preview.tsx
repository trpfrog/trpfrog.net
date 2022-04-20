import React from 'react'
import {GetServerSideProps, NextPage} from "next";
import Image from "next/image";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

import {BlogPost, getPreviewPostData} from "../../lib/blog/load";
import {BlogImageData} from "../../lib/blog/imagePropsFetcher";

import BlogMarkdown, {getPureCloudinaryPath} from "../../components/blog/BlogMarkdown";

import styles from '../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {formatReadTime} from "../../lib/blog/readTime";
import {parseWithBudouX} from "../../lib/wordSplit";


type PageProps = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
}

const errorArticle = {
    isError: true,
    title: 'ERROR!',
    slug: 'slug',
    date: '2000-10-17',
    updated: '2020-10-17',
    tags: 'test',
    readTime: 100,
    content: [['Error has occurred']]
} as BlogPost

export const getErrorArticle = (errTitle: string) => {
    let ret = {...errorArticle}
    ret.title = 'ERR: ' + errTitle
    return ret
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const entry = context.query.src
        ? await getPreviewPostData(context.query.src as string)
        : getErrorArticle('src query is missing!')
    return {
        props: {
            entry: JSON.parse(JSON.stringify(entry)),
            imageSize: {}
        }
    }
}

const Article: NextPage<PageProps> = ({ entry: post }) => {

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
                    <h1>{parseWithBudouX(post.title, post.slug)}</h1>
                    <p>{post.description}</p>
                    {/* @ts-ignore */}
                    {!post.isError &&
                        <p style={{fontSize: '1.5em', color: 'red', fontWeight: 'bold'}}>
                            これは記事プレビューです<br/>
                            SNSなど外部への共有を禁じます
                        </p>
                    }
                    <p>
                        <FontAwesomeIcon icon={faCalendarDay}/>{' '}
                        <time dateTime={post.date}>
                            {dayjs(post.date).format('YYYY年M月D日')}
                        </time>
                        {(post.updated && post.date < post.updated) &&
                            <>
                                <br/>
                                <FontAwesomeIcon icon={faSyncAlt}/>{' '}
                                <time dateTime={post.updated}>
                                    {dayjs(post.updated).format('YYYY年M月D日')} 更新
                                </time>
                            </>
                        }
                        <br/>
                        <FontAwesomeIcon icon={faClock}/>{' '}
                        予想読了時間 {readMin} 分 {readSec} 秒
                    </p>
                </div>
            </Title>
            <NextSeo
                title={`記事プレビュー - つまみログ`}
                description={post.description}
                openGraph={openGraphImage}
            />
            <BlogMarkdown
                entry={post}
                imageSize={{}}
            />
        </Layout>
    )
}

export default Article
