import Link from 'next/link'
import Image from "next/legacy/image";

import Title from "../../../components/Title";
import Block from "../../../components/Block";

import {
  getAllPostPaths,
  getPostData,
  getSortedPostsData,
} from "../../../lib/blog/load";
import {fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

import BlogMarkdown from "../renderer/BlogMarkdown";

import styles from '../../../styles/blog/blog.module.scss';

import NextSeoWrapper from "../../../components/utils/NextSeoWrapper";
import Tag from "../../../components/blog/Tag";
import {ParseWithBudouX} from "../../../lib/wordSplit";
import PostAttributes from "../../../components/blog/PostAttributes";
import {
  faArrowLeft,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import RelatedPosts from "../../../components/blog/RelatedPosts";
import PageNavigation from "../../../components/blog/PageNavigation";
import {HeaderFollowSticky} from "../../../components/header/Header";
import ArticleCard from "../../../components/blog/ArticleCard";
import {UDFontBlock, UDFontButton} from "../../../components/blog/UDFontBlock";
import EntryButton from "../../../components/blog/EntryButton";
import {BadBlogBlock, BadBlogButton} from "../../../components/blog/BadBlogButton";
import React from "react";
import TogglePageViewLink from "../../../components/blog/TogglePageViewLink";
import ShareSpan from "./ShareSpan";
import EditButton from "./EditButton";
import {getPureCloudinaryPath} from "../../../lib/blog/getPureCloudinaryPath";
import BlogPost from "../../../lib/blog/blogPost";

type PageProps = {
  params: {
    slug: [string, string | undefined]
  }
}

export async function generateStaticParams() {
  const paths = await getAllPostPaths()
  return paths.map(slug => ({ slug: slug.toString() }))
}

const processSlug = async (slug: string, page?: string) => {
  const postDataOption = {
    pagePos1Indexed: page ? parseInt(page, 10) : 1,
    all: page === 'all'
  }

  const entry: BlogPost = await getPostData(slug, postDataOption)

  const tags = entry.tags.split(',')[0].trim()
  const relatedPosts: BlogPost[] = !tags[0] ? []
    : (await getSortedPostsData(tags[0]))
      .filter((e: BlogPost) => e.slug !== entry.slug)

  const useCloudinary = process.env.NODE_ENV === 'production'
  return {
    entry: JSON.parse(JSON.stringify(entry)),
    imageSize: await fetchAllImageProps(entry, useCloudinary),
    relatedPosts,
  }
}

export default async function Index({ params: { slug } }: PageProps) {

  const {
    entry: post,
    imageSize,
    relatedPosts
  } = await processSlug(...slug)

  // // This code is used to reload page automatically on some changes appeared on md files
  // if (process.env.NODE_ENV !== 'production') {
  //   // For development, fetch article data from api
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     const f = async () => {
  //       return await fetch(`/api/posts/${post.slug}/${post.currentPage}`).then((res) =>
  //         res.json()
  //       )
  //     }
  //     f().then(r => setPost(r))
  //   }, [])
  //   doMarkdownHMR()
  // }

  const openGraphImage = post.thumbnail ? {
    images: [
      {url: post.thumbnail}
    ]
  } : {}

  return (
    <div id="main_wrapper" className={styles.layout}>
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
          <h1>
            <ParseWithBudouX str={
              (() => {
                if (post.title.endsWith('！')) {
                  return post.title.slice(0, post.title.length - 1) + ' !'
                } else {
                  return post.title
                }
              })()
            } slug={post.slug} />
          </h1>
          <p style={{margin: '1em'}}>{post.description}</p>
          <PostAttributes post={post}/>

          {/* Tags */}
          <p>
            {post.tags
              .split(',')
              .map((tag: string) => tag.trim())
              .map((tag: string) => (
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

              <EntryButton icon={faArrowLeft} text={'記事一覧'}/>

            </Link>
            <ShareSpan slug={post.slug}>
              <EntryButton icon={faTwitter} text={'ツイート'}/>
            </ShareSpan>
            <a href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
              <EntryButton icon={faPencil} text={'訂正依頼'}/>
            </a>
            <UDFontButton/>
            {post.numberOfPages >= 2 && <TogglePageViewLink post={post}/>}
          </div>

          {process.env.NODE_ENV === 'development' &&
            <p>
              <EditButton slug={post.slug}/>
            </p>
          }
          <BadBlogButton/>
        </div>
      </Title>
      <NextSeoWrapper
        title={`${post.title} - つまみログ`}
        description={post.description}
        openGraph={openGraphImage}
      />

      <div className={styles.main_content}>
        <div className={styles.article_wrapper}>
          <UDFontBlock>
            <BadBlogBlock>
              <BlogMarkdown
                entry={post}
                imageSize={post.imageSize}
              />
            </BadBlogBlock>
          </UDFontBlock>
        </div>
        <aside>
          <HeaderFollowSticky top={'1em'}>
            <ArticleCard
              entry={post}
              style={{
                pointerEvents: 'none',
                borderRadius: 30,
                marginBottom: '1em'
              }}
            />
            <Block className={styles.blog_side_bar} style={{padding: '1.5em 0.5em'}}>
              <div style={{transform: 'scale(0.9)', transformOrigin: 'top'}}>
                <Link href={'/blog'}>

                  <EntryButton icon={faArrowLeft} text={'記事一覧'}/>

                </Link>
                <ShareSpan slug={post.slug}>
                  <EntryButton icon={faTwitter} text={'ツイート'}/>
                </ShareSpan>
                <a href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
                  <EntryButton icon={faPencil} text={'訂正依頼'}/>
                </a>
                <div style={{height: '1em'}}/>
                <PageNavigation entry={post}/>
              </div>
            </Block>
          </HeaderFollowSticky>
        </aside>
      </div>
      <Block id={styles.entry_bottom_buttons}>
        <p className={'link-area'} style={{textAlign: 'center'}}>
          <Link href={'/blog'}>
            記事一覧
          </Link>
          <ShareSpan slug={post.slug}>
            <a>ツイート</a>
          </ShareSpan>
          <a href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
            訂正リクエスト
          </a>
        </p>
      </Block>
      <RelatedPosts
        tag={post.tags.split(',')[0].trim()}
        relatedPosts={relatedPosts}
      />
    </div>
  );
}
