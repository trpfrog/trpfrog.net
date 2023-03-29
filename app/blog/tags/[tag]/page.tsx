import {getAllTags, getSortedPostsData} from "../../../../lib/blog/load";
import Layout from "../../../../components/Layout";
import Title from "../../../../components/Title";
import Link from "next/link";
import React from "react";
import ArticleCard, {ArticleGrid} from "../../../../components/blog/ArticleCard";
import NextSeoWrapper from "../../../../components/utils/NextSeoWrapper";

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(t => ({ tag: t.params.tag }))
}

type Props = {
  params: {
    tag: string
  }
}

export default async function Index ({ params }: Props) {
  const tag = decodeURIComponent(params!.tag)
  const articles = await getSortedPostsData(tag)

  return <>
    <div id="main_wrapper">
      <Title>
        <h1>タグ「{tag}」の記事一覧</h1>
        <p>
          <Link href={'/blog'} className={'linkButton'}>
            記事一覧に戻る
          </Link>
        </p>
      </Title>
      <NextSeoWrapper title={`タグ「${tag}」の記事一覧 - つまみログ`}/>

      <ArticleGrid>
        {articles.map(entry => <ArticleCard entry={entry} key={entry.slug}/>)}
      </ArticleGrid>
    </div>
  </>;
}
