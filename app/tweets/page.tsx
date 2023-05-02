import {Metadata} from "next";
import Title from "../../components/Title";
import React, {Suspense} from "react";
import TweetCard, {DateCard} from "./TweetCard";
import SearchForm from "./SearchForm";
import search from "./tweetSearcher";
import Block from "../../components/Block";
import PageNavigation from "./PageNavigation";
import dayjs from "dayjs";

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
  const { results, maxPage, keywords, tweetCount } = await search(searchParams)

  const tweetCards: React.ReactNode[] = []

  for (let i = 0; i < results.length; i++) {
    const tweet = results[i]
    const showDate = i === 0 || results[i - 1].createdAt.getDate() !== tweet.createdAt.getDate()
    if (showDate) {
      tweetCards.push(
        <DateCard date={tweet.createdAt} key={`date-card-${tweet.id}`} />
      )
    }
    tweetCards.push(
      <React.Fragment key={tweet.id}>
        <TweetCard tweet={tweet} keywords={keywords}/>
      </React.Fragment>
    )
  }

  const oneYearsAgo = dayjs(new Date()).subtract(1, 'year').format('YYYY-MM-DD')

  return (
    <div id="main_wrapper">
      <Title title={'Tweets'} ribbonText={'BETA'}>
        <p>
          つまみさんの過去ツイデータベースです。
          <strong>2023 年 4 月 22 日版</strong>
        </p>
        <p>
          <strong>注意:</strong>{' '}
          過去のツイートにはなかなか厳しいものも含まれます。
          現在のつまみさんとは意見がだいぶ異なる場合があります。
          だいたい数年前のツイートは自分でも「何言ってんだこいつ……」となることが多いです。
        </p>
        <p>
          <a
            href={'/tweets?q=' + encodeURIComponent('date:' + oneYearsAgo)}
            className={'linkButton'}
          >
             1年前のツイートを見る
          </a>
        </p>
        <br/>
        <details>
          <summary>実装済みの機能</summary>
          <ul style={{marginTop: 0}}>
            <li>AND 検索</li>
            <li>since/until 検索 (日付のみ e.g. 2000-10-17)</li>
            <li>date 検索 (特定の日のツイートを検索します)</li>
            <li>min_faves/max_faves 検索</li>
            <li>min_retweets/max_retweets 検索</li>
            <li>from 検索</li>
            <li>order:asc で古い順に並び替え</li>
            <li>マイナス検索 (上記のいずれにも使用可)</li>
          </ul>
        </details>
        <SearchForm defaultValue={searchParams.q}/>
      </Title>

      <PageNavigation
        currentPage={parseInt(searchParams.p ?? '1', 10) ?? 1}
        lastPage={maxPage}
        numTweets={tweetCount}
        key={'top'}
      />

      <div id={'tweets'}>
        {tweetCount > 0 ? tweetCards : (
          <Block style={{textAlign: 'center', fontSize: '1.2em'}}>
            <p>「<strong>{searchParams.q}</strong>」に一致するツイートは見つかりませんでした。</p>
          </Block>
        )}
      </div>

      <PageNavigation
        currentPage={parseInt(searchParams.p ?? '1', 10) ?? 1}
        lastPage={maxPage}
        numTweets={tweetCount}
        key={'bottom'}
      />

      <Block>
        RT の削除依頼はお手数ですが contact ⭐︎ trpfrog.net または、@TrpFrog までお願いします。
      </Block>
    </div>
  )
}
