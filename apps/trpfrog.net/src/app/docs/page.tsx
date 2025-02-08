import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Title } from '@/components/organisms/Title'

import { docsPaths } from './pages'

export default async function Docs() {
  return (
    <MainWrapper gridLayout>
      <Title title="Docs" description="つまみネットのドキュメントまとめ" />
      {Object.keys(docsPaths).map(slug => (
        <RichButton as={Link} key={slug} href={`/docs/${slug}`}>
          {slug}
        </RichButton>
      ))}
    </MainWrapper>
  )
}
