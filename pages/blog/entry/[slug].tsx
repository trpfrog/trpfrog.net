import React, {CSSProperties} from 'react'
import {GetStaticProps, NextPage} from "next";
import Link from 'next/link'

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";

import {BlogPost, getAllPostSlugs, getPostData, fetchAllImageSize, BlogImageData} from "../../../lib/blog";
import BlogMarkdown from "../../../components/blog/BlogMarkdown";

import ArticleBlock from "../../../components/blog/ArticleBlock";
import PageNavigation from "../../../components/blog/PageNavigation";

import styles from '../../../styles/blog/blog.module.scss';
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import TrpFrog404 from "../../404";

type PageProps = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
}

type Params = {
    slug: string
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
    const entry = await getPostData(params!.slug)
    const imageSize = await fetchAllImageSize(entry);
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
    if(!process.browser) return;
    const articleURL = 'https://trpfrog.net/blog/entry/' + slug
    const tweetURL =  'https://twitter.com/intent/tweet?'
                + "text=" + encodeURIComponent(document.title) + "&"
                + "url=" + encodeURIComponent(articleURL);
    window.open(tweetURL);
}

const Article: NextPage<PageProps> = ({ entry, imageSize }) => {

    const thumbnailStyle: CSSProperties = entry.thumbnail ? {
        backgroundImage: `url(${entry.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {}

    const openGraphImage = entry.thumbnail ? {
        images: [
            {url: entry.thumbnail}
        ]
    } : {}

    const { query } = useRouter()
    const validatePagePosition = (x: number) => Math.floor(Math.max(0, Math.min(entry.content.length, x) - 1))
    const pagePosition = validatePagePosition(parseInt(query.page as string ?? '1'))

    if(query.page == 'all') {
        entry.content = [entry.content.join('\n')]
    }

    return (
        <Layout>
            <Title style={{...thumbnailStyle, padding: 0}}>
                <div className={styles.inner_title_block}>
                    <h1>{entry.title}</h1>
                    <p>{entry.description}</p>
                    <ArticleBlock entry={entry} showTitle={false} showDescription={false} showBackground={false}/>
                    <p id={styles.entry_top_buttons}>
                        <p className={'link-area'}>
                            <Link href={'/blog'}>
                                <a>記事一覧</a>
                            </Link>
                            <span onClick={() => share(entry.slug)}>
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
                title={`${entry.title} - つまみログ`}
                description={entry.description}
                openGraph={openGraphImage}
            />
            <Block>
                <PageNavigation entry={entry} pagePosition={pagePosition} doNotShowOnFirst={true}/>
                <BlogMarkdown entry={entry} imageSize={imageSize}/>
                <PageNavigation entry={entry} pagePosition={pagePosition}/>
            </Block>
            <Block id={styles.entry_bottom_buttons}>
                <p className={'link-area'} style={{textAlign: 'center'}}>
                    <Link href={'/blog'}>
                        <a>記事一覧</a>
                    </Link>
                    <span onClick={() => share(entry.slug)}>
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
