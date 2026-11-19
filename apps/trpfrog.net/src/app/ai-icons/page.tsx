import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Title } from '@/components/organisms/Title'

import { Icons } from './Icons'
import { SkillInstall } from './SkillInstall'

export const metadata = {
  title: 'AI Generated Icons',
  description: 'AI により毎日更新される、つまみアイコンの生成履歴です',
} satisfies Metadata

export default async function Index() {
  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description} />
      <SkillInstall />
      <div className="tw:mt-4">
        <Icons />
      </div>
    </MainWrapper>
  )
}
