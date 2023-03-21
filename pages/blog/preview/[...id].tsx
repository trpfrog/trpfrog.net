import React from 'react'
import {GetServerSideProps, NextPage} from "next";
import Image from "next/legacy/image";

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";

import {getPreviewPostData} from "../../../lib/blog/loadPreview";
import {BlogImageData, fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

import BlogMarkdown, {getPureCloudinaryPath} from "../../../components/blog/BlogMarkdown";

import styles from '../../../styles/blog/blog.module.scss';

import {NextSeo} from "next-seo";
import {formatReadTime} from "../../../lib/blog/readTime";
import {parseWithBudouX} from "../../../lib/wordSplit";
import PostAttributes from "../../../components/blog/PostAttributes";
import {createErrorArticle, ErrorablePost} from "../../../lib/blog/loadPreview";

type PageProps = {
  entry: ErrorablePost
  imageSize: { [path: string]: BlogImageData }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let [id, page] = context.params?.id as string[]
  page = page ?? '1'

  console.log(context.query)

  const option = {
    pagePos1Indexed: parseInt(page),
    all: page === 'all',
    showPreviewCheckpoint: ('checkpoint' in (context.query ?? []))
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

const Article: NextPage<PageProps> = ({entry: post, imageSize}) => {
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
            <p style={{fontSize: '1.5em', color: 'var(--header-color)', fontWeight: 'bold'}}>
              記事プレビューです<br/>
              URLを知っているユーザーのみが閲覧できます
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
