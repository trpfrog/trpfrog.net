import React from 'react'

import { Metadata } from 'next'

import dayjs from 'dayjs'

import Button from '@/components/atoms/Button'
import MainWrapper from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import Title from '@/components/organisms/Title'

import SearchForm from './SearchForm'
import TweetArea from './TweetArea'

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
  },
} satisfies Metadata

export default async function Index({ searchParams }: any) {
  const oneYearsAgo = dayjs(new Date()).subtract(1, 'year').format('YYYY-MM-DD')

  return (
    <MainWrapper>
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
          <Button
            href={
              '/tweets?q=' +
              encodeURIComponent('date:' + oneYearsAgo) +
              '#tweets'
            }
          >
            1年前のツイートを見る
          </Button>
        </p>
        <br />
        <details>
          <summary>実装済みの機能</summary>
          <ul style={{ marginTop: 0 }}>
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
        <SearchForm defaultValue={searchParams.q} />
      </Title>

      <TweetArea searchParams={searchParams} />

      <Block>
        RT の削除依頼はお手数ですが contact ⭐︎ trpfrog.net または、@TrpFrog
        までお願いします。
      </Block>
    </MainWrapper>
  )
}
