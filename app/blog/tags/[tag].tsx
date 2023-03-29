import {getAllTags, getSortedPostsData} from "../../../lib/blog/load";
import {GetStaticProps, NextPage} from "next";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import {NextSeo} from "next-seo";
import Link from "next/link";
import React from "react";
import ArticleCard, {ArticleGrid} from "../../../components/blog/ArticleCard";
import BlogPost from "../../../lib/blog/blogPost";

type Props = {
  tag: string
  articles: BlogPost[]
};
type Params = {
  tag: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
  const articles = await getSortedPostsData(params!.tag)
  return {
    props: {
      tag: params!.tag,
      articles
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllTags()
  return {
    paths,
    fallback: false
  }
}

const Blog: NextPage<Props> = ({articles, tag}) => {
  return <>
    <Layout>
      <Title>
        <h1>タグ「{tag}」の記事一覧</h1>
        <p>
          <Link href={'/blog'} className={'linkButton'}>
            記事一覧に戻る
          </Link>
        </p>
      </Title>
      <NextSeo title={`タグ「${tag}」の記事一覧 - つまみログ`}/>

      <ArticleGrid>
        {articles.map(entry => <ArticleCard entry={entry} key={entry.slug}/>)}
      </ArticleGrid>
    </Layout>
  </>;
}

export default Blog
