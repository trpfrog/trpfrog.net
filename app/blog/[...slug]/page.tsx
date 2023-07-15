import Image from "next/legacy/image";

import Title from "@/components/Title";
import Block from "@/components/Block";

import {
  getAllPostSlugs,
  getPostData,
  getSortedPostsData,
} from "@/lib/blog/load";
import {fetchAllImageProps} from "@/lib/blog/imagePropsFetcher";

import BlogMarkdown from "../renderer/BlogMarkdown";

import styles from '../../../styles/blog/blog.module.scss';

import Tag from "@/components/blog/Tag";
import {ParseWithBudouX} from "@/lib/wordSplit";
import PostAttributes from "@/components/blog/PostAttributes";
import RelatedPosts from "@/components/blog/RelatedPosts";
import {UDFontBlock} from "@/components/blog/UDFontBlock";
import {BadBlogBlock, BadBlogButton} from "@/components/blog/BadBlog";
import React from "react";
import EditButton from "./EditButton";
import {getPureCloudinaryPath} from "@/lib/blog/getPureCloudinaryPath";
import BlogPost from "@/lib/blog/blogPost";
import {Metadata} from "next";
import {EntryButtons, RichEntryButtons} from "./EntryButtons";
import ArticleSidebar from "./ArticleSidebar";
import Balancer from "react-wrap-balancer";
import DevBlogMarkdown from "../renderer/DevBlogMarkdown";
import MainWrapper from "@/components/MainWrapper";

// Trick for NEXT-1214
// export const dynamicParams = false
const dynamicParams = false
export {dynamicParams}

type PageProps = {
  params: {
    slug: [string, string | undefined]
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  let paths = []

  for (const slug of slugs) {
    const entry = await getPostData(slug)
    for (let i = 1; i <= entry.numberOfPages; i++) {
      paths.push({slug: [slug, i + ""]})
    }
    paths.push({slug: [slug]})
    paths.push({slug: [slug, 'all']})
  }

  return paths
}

export async function generateMetadata({ params }: PageProps) {
  const {
    title, description, thumbnail
  } = await getPostData(params.slug[0])

  const metadata: Metadata = {
    title,
    description
  };

  if (thumbnail) {
    metadata.openGraph = {
      images: [
        {url: thumbnail}
      ]
    }
  }
  return metadata
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
    entry: JSON.parse(JSON.stringify(entry)) as BlogPost,
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

  return (
    <MainWrapper className={styles.layout}>
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
            <Balancer>
              <ParseWithBudouX str={
                (() => {
                  if (post.title.endsWith('！')) {
                    return post.title.slice(0, post.title.length - 1) + ' !'
                  } else {
                    return post.title
                  }
                })()
              } slug={post.slug} />
            </Balancer>
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
            <RichEntryButtons post={post} extended={true}/>
          </div>
          {process.env.NODE_ENV === 'development' &&
            <p>
              <EditButton slug={post.slug}/>
            </p>
          }
          <BadBlogButton/>
        </div>
      </Title>

      <div className={styles.main_content}>
        <div className={styles.article_wrapper}>
          <UDFontBlock>
            <BadBlogBlock>
              {process.env.NODE_ENV === 'production'
                ? <BlogMarkdown entry={post} imageSize={imageSize}/>
                : <DevBlogMarkdown entry={post} imageSize={imageSize}/>
              }
            </BadBlogBlock>
          </UDFontBlock>
        </div>
        <aside>
          <ArticleSidebar post={post}/>
        </aside>
      </div>

      <Block id={styles.entry_bottom_buttons}>
        <EntryButtons post={post}/>
      </Block>
      <RelatedPosts
        tag={post.tags.split(',')[0].trim()}
        relatedPosts={relatedPosts}
      />
    </MainWrapper>
  );
}
