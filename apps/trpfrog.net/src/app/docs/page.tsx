import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Title } from '@/components/organisms/Title'

import { docsPaths } from './pages'

export default async function Docs() {
  return (
    <MainWrapper gridLayout>
      <Title title="Docs" description="つまみネットのドキュメントまとめ" />
      {Object.keys(docsPaths).map(slug => (
        <RichButton href={`/docs/${slug}`} key={slug}>
          {slug}
        </RichButton>
      ))}
    </MainWrapper>
  )
}
