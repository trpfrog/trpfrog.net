import { MainWrapper } from '@/components/atoms/MainWrapper'
import { createMetadataWithTitle } from '@/components/organisms/Title'

import { loadMutualLinkRecords, MutualLinkRecord } from './loader'
import { MutualLinkBlock } from './MutualLinkBlock'

export const metadata = createMetadataWithTitle({
  title: 'Links',
  description: '知人の個人サイト紹介',
})

export default async function Index() {
  const mutualLinks: MutualLinkRecord[] = await loadMutualLinkRecords()
  return (
    <MainWrapper gridLayout>
      <metadata.Title>
        <p>
          順番はハンドルネームをUTF-8でソートしたもの。
          <s>片想いリンクになったやつもある</s>
        </p>
      </metadata.Title>
      <div className="tw-grid tw-grid-cols-3 tw-gap-3 sp:tw-grid-cols-1">
        {mutualLinks.map(record => (
          <MutualLinkBlock record={record} key={record.url} />
        ))}
      </div>
    </MainWrapper>
  )
}
