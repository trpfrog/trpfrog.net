import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Title } from '@/components/organisms/Title'

import { loadMutualLinkRecords, MutualLinkRecord } from './loader'
import { MutualLinkBlock } from './MutualLinkBlock'

export const metadata = {
  title: 'Links',
  description: '知人の個人サイト紹介',
} satisfies Metadata

export default async function Index() {
  const mutualLinks: MutualLinkRecord[] = await loadMutualLinkRecords()
  return (
    <MainWrapper gridLayout>
      <Title title={metadata.title} description={metadata.description}>
        <p>
          順番はハンドルネームをUTF-8でソートしたもの。
          <s>片想いリンクになったやつもある</s>
        </p>
      </Title>
      <div className="tw:grid tw:grid-cols-3 tw:gap-3 tw:sp:grid-cols-1">
        {mutualLinks.map(record => (
          <MutualLinkBlock record={record} key={record.url} />
        ))}
      </div>
    </MainWrapper>
  )
}
