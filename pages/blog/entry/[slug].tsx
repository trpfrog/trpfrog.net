import React from 'react'
import {GetStaticProps, NextPage} from "next";
import Link from 'next/link'

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";


import {BlogPost, getAllPostSlugs, getPostData, getAllImageSize, BlogImageSize} from "../../../lib/blog";
import BlogMarkdown from "../../../components/BlogMarkdown";

import styles from '../../../styles/blog.module.scss'
import {format, parseISO} from "date-fns";

type PageProps = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageSize }
}

type Params = {
    slug: string
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
    const entry = await getPostData(params!.slug)
    const imageSize = await getAllImageSize(entry.content);
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

const share = () => {
    if(!process.browser) return;
    const url =  'https://twitter.com/intent/tweet?'
                + "text=" + encodeURIComponent(document.title) + "&"
                + "url=" + location.href;
    window.open(url);
}

const Article: NextPage<PageProps> = ({ entry, imageSize }) => {

    return (
        <Layout>
            <Title title={entry.title} description={entry.description}>
                <p>
                    <time dateTime={entry.date}>
                        {format(parseISO(entry.date), 'LLLL d, yyyy')}
                    </time>
                </p>
                <p>
                    <Link href={'/blog'}>
                        <a className={'linkButton'}>記事一覧に戻る</a>
                    </Link>
                </p>
            </Title>
            <Block>
                <BlogMarkdown markdown={entry.content} imageSize={imageSize}/>
            </Block>
            <Block style={{background: 'none', boxShadow: 'none', padding: 0}}>
                <p className={'link-area'} style={{textAlign: 'center'}}>
                    <Link href={'/blog'}>
                        <a>記事一覧</a>
                    </Link>
                    <span onClick={share}>
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