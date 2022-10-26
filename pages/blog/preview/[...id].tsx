import React from 'react'
import {GetServerSideProps, NextPage} from "next";
import Image from "next/legacy/image";

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";

import {BlogPost, getPreviewPostData} from "../../../lib/blog/load";
import {BlogImageData, fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

import BlogMarkdown, {getPureCloudinaryPath} from "../../../components/blog/BlogMarkdown";

import styles from '../../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {formatReadTime} from "../../../lib/blog/readTime";
import {parseWithBudouX} from "../../../lib/wordSplit";
import PostAttributes from "../../../components/blog/PostAttributes";


type PageProps = {
    entry: ErrorablePost
    imageSize: { [path: string]: BlogImageData }
}

type ErrorablePost = BlogPost & {
    isError: boolean
}

const errorArticle = {
  isError: true,
  title: 'ERROR!',
  slug: 'slug',
  date: '2000-10-17',
  updated: '2020-10-17',
  tags: 'test',
  isAll: false,
  readTime: 100,
  currentPage: 1,
  numberOfPages: 1,
  content: ['Error has occurred']
} as ErrorablePost

export const createErrorArticle = (errTitle: string): ErrorablePost => {
  let ret = {...errorArticle}
  ret.title = 'ERR: ' + errTitle
  return ret
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let [id, page] = context.params?.id as string[]
  page = page ?? '1'

  const option = {
    pagePos1Indexed: parseInt(page),
    all: page === 'all'
  }

  const entry = id
    ? await getPreviewPostData(id, option) as ErrorablePost
    : createErrorArticle('ID is missing!')
  const imageSize = entry.isError ? {} : await fetchAllImageProps(entry);
  return {
    props: {
      entry: JSON.parse(JSON.stringify(entry)),
      imageSize
    }
  }
}

const Article: NextPage<PageProps> = ({ entry: post, imageSize }) => {

  const openGraphImage = post.thumbnail ? {
    images: [
      {url: post.thumbnail}
    ]
  } : {}

  const {
    minutes: readMin,
    seconds: readSec
  } = formatReadTime(post.readTime)

  return (
    <Layout>
      <NextSeo noindex={true}/>
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
          {!post.isError &&
                        <p style={{fontSize: '1.5em', color: 'red', fontWeight: 'bold'}}>
                            これは記事プレビューです<br/>
                            SNSなど外部への共有を禁じます
                        </p>
          }
          <PostAttributes post={post}/>
        </div>
      </Title>
      <NextSeo
        title={`記事プレビュー - つまみログ`}
        description={post.description}
        openGraph={openGraphImage}
      />
      <BlogMarkdown
        entry={post}
        imageSize={imageSize}
      />
    </Layout>
  )
}

export default Article
