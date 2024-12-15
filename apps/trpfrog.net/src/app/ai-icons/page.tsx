import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Title } from '@/components/organisms/Title'

import { Icons } from './Icons'

export const metadata = {
  title: 'AI Generated Icons',
  description: 'AI により生成されたつまみアイコンの生成履歴です',
} satisfies Metadata

export default async function Index() {
  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description} />
      <div className="tw-mt-4">
        <Icons limit={20} />
      </div>
    </MainWrapper>
  )
}
