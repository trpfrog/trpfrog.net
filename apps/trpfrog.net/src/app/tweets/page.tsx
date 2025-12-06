import { Metadata } from 'next'

import { format, subYears } from 'date-fns'
import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { Li, UnorderedList } from '@/components/wrappers'

import { SearchForm } from './SearchForm'
import { TweetArea } from './TweetArea'

// Prisma does not support Edge without the Data Proxy currently
export const preferredRegion = 'home'

export const metadata = {
  title: 'ツイートデータベース',
  description: 'つまみさんのツイートです',
  robots: {
    index: false,
    follow: false,
  },
} satisfies Metadata

export default async function Index(props: PageProps<'/tweets'>) {
  const searchParams = await props.searchParams
  const oneYearsAgo = format(subYears(new Date(), 1), 'yyyy-MM-dd')
  const query = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q || ''
  const page = Array.isArray(searchParams.p) ? searchParams.p[0] : searchParams.p || ''

  return (
    <MainWrapper gridLayout>
      <Title title={'Tweets'} ribbonText={'BETA'}>
        <p>
          つまみさんの過去ツイデータベースです。
          <strong>2023 年 4 月 22 日版</strong>
        </p>
        <p>
          <strong>注意:</strong> 過去のツイートにはなかなか厳しいものも含まれます。
          現在のつまみさんとは意見がだいぶ異なる場合があります。
          だいたい数年前のツイートは自分でも「何言ってんだこいつ……」となることが多いです。
        </p>
        <p>
          <RichButton
            as={Link}
            href={'/tweets?q=' + encodeURIComponent('date:' + oneYearsAgo) + '#tweets'}
          >
            1年前のツイートを見る
          </RichButton>
        </p>
        <br />
        <details>
          <summary>実装済みの機能</summary>
          <UnorderedList style={{ marginTop: 0 }}>
            <Li>AND 検索</Li>
            <Li>since/until 検索 (日付のみ e.g. 2000-10-17)</Li>
            <Li>date 検索 (特定の日のツイートを検索します)</Li>
            <Li>min_faves/max_faves 検索</Li>
            <Li>min_retweets/max_retweets 検索</Li>
            <Li>from 検索</Li>
            <Li>order:asc で古い順に並び替え</Li>
            <Li>マイナス検索 (上記のいずれにも使用可)</Li>
          </UnorderedList>
        </details>
        <SearchForm defaultValue={query} />
      </Title>

      <TweetArea query={query} page={page} />

      <Block>
        RT の削除依頼はお手数ですが contact ⭐︎ trpfrog.net または、@TrpFrog までお願いします。
      </Block>
    </MainWrapper>
  )
}
