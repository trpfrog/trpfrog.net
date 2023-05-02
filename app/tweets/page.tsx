import {Metadata} from "next";
import Title from "../../components/Title";
import React, {Suspense} from "react";
import TweetCard from "./TweetCard";
import SearchForm from "./SearchForm";
import search from "./tweetSearcher";

// Prisma does not support Edge without the Data Proxy currently
export const runtime = 'nodejs' // default
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'ツイートデータベース',
  description: 'つまみさんのツイートです',
  robots: {
    index: false,
    follow: false,
  }
} satisfies Metadata


export default async function Index({ searchParams }: any) {
  const { results, keywords } = await search(searchParams)

  const tweetCards = results.map((tweet) => {
    return (
      <React.Fragment key={tweet.id}>
        <TweetCard tweet={tweet} keywords={keywords}/>
      </React.Fragment>
    )
  })

  return (
    <div id="main_wrapper">
      <Title title={'Tweets'} ribbonText={'BETA'}>
        <p>
          つまみさんの過去ツイデータベースです。
        </p>
        <p>
          <strong>注意:</strong>{' '}
          過去のツイートにはなかなか厳しいものも含まれます。
          現在のつまみさんとは意見がだいぶ異なる場合があります。
          だいたい数年前のツイートは自分でも「何言ってんだこいつ……」となることが多いです。
        </p>
        <br/>
        <details>
          <summary>実装済みの機能</summary>
          <ul style={{marginTop: 0}}>
            <li>AND 検索</li>
            <li>since/until 検索 (日付のみ e.g. 2000-10-17)</li>
            <li>min_faves/max_faves 検索</li>
            <li>min_retweets/max_retweets 検索</li>
            <li>from 検索</li>
            <li>order:asc で古い順に並び替え</li>
            <li>マイナス検索 (上記のいずれにも使用可)</li>
          </ul>
        </details>
        <SearchForm defaultValue={searchParams.q}/>
      </Title>

      <div>
        {tweetCards}
      </div>
    </div>
  )
}
