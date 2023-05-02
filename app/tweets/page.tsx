import {Metadata} from "next";
import Title from "../../components/Title";
import React, {Suspense} from "react";
import TweetCard from "./TweetCard";
import SearchForm from "./SearchForm";
import search from "./tweetSearcher";

export const metadata = {
  title: 'ツイートデータベース',
  description: 'つまみさんのツイートです',
  robots: {
    index: false,
    follow: false,
  }
} satisfies Metadata


export default async function Index({ searchParams }: any) {
  const { results, keyword } = await search(searchParams)

  const tweetCards = results.map((tweet) => {
    return (
      <React.Fragment key={tweet.id}>
        <TweetCard tweet={tweet} keyword={keyword}/>
      </React.Fragment>
    )
  })

  return (
    <div id="main_wrapper">
      <Title title={'Tweets'} ribbonText={'BETA'}>
        <p>
          {metadata.description}
        </p>
        <br/>
        <h3 style={{all: 'initial', fontWeight: 'bold'}}>実装済みの機能:</h3>
        <ul style={{marginTop: 0}}>
          <li>キーワード検索 (AND OR 未実装)</li>
          <li>since/until 検索</li>
        </ul>
        <SearchForm defaultValue={searchParams.q}/>
      </Title>

      <div>
        {tweetCards}
      </div>
    </div>
  )
}
