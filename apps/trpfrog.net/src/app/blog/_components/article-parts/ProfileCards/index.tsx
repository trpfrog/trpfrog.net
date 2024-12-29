import { parseObjectList } from '@trpfrog.net/posts/parser'
import { createURL } from '@trpfrog.net/utils'
import { addDays, format } from 'date-fns'
import { z } from 'zod'

import { InlineLink } from '@/components/atoms/InlineLink'
import { RichButton } from '@/components/atoms/RichButton'
import { A, Li, UnorderedList } from '@/components/wrappers'

import { SwitchUI } from '@blog/_components/article-parts/ProfileCards/SwitchUI'
import { ArticleParts } from '@blog/_components/ArticleParts'

import styles from './index.module.scss'

const ProfileDataSchema = z.object({
  name: z.string(),
  club: z.string().optional(),
  twitter: z.string().optional(),
  description: z.string(),
})

export type ProfileData = z.infer<typeof ProfileDataSchema>

async function CardFormat({ personalDataList }: { personalDataList: ProfileData[] }) {
  const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
  return (
    <div className={styles.profile_card_grid}>
      {personalDataList.map(personalData => (
        <div className={styles.profile_card} key={personalData.name}>
          <div className={styles.header}>
            <div className={styles.club}>{personalData.club}</div>
            <div className={styles.twitter_id}>
              <InlineLink href={'https://twitter.com/' + personalData.twitter}>
                @{personalData.twitter}
              </InlineLink>
            </div>
          </div>
          <div className={styles.name}>
            {personalData.name}
            <span style={{ fontSize: '0.8em' }}>
              {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
            </span>
          </div>
          <div className={styles.description}>
            <RenderInlineMarkdown markdown={personalData.description} />
          </div>
        </div>
      ))}
    </div>
  )
}
async function ListFormat({ personalDataList }: { personalDataList: ProfileData[] }) {
  const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
  return (
    <UnorderedList>
      {personalDataList.map(personalData => (
        <>
          <Li key={personalData.name + '-name'}>
            {personalData.name}
            {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
          </Li>
          <UnorderedList key={personalData.name + '-info'}>
            <Li>{personalData.club}</Li>
            <Li>
              <InlineLink href={'https://twitter.com/' + personalData.twitter}>
                @{personalData.twitter}
              </InlineLink>
            </Li>
            <Li>
              <RenderInlineMarkdown markdown={personalData.description} />
            </Li>
          </UnorderedList>
        </>
      ))}
    </UnorderedList>
  )
}

export const profileCardParts = {
  name: 'profile-cards',
  Component: ({ content, held }: { content: string; held?: string }) => {
    const personalDataList = parseObjectList(content)
      .map(e => ProfileDataSchema.safeParse(e))
      .filter(e => e.success)
      .map(e => e.data)

    const twitterSearchLink = createURL('/search', 'https://twitter.com/', {
      q: personalDataList.map(e => 'from:' + e.twitter).join(' OR '),
      until: held ? format(addDays(held, 1), 'yyyy-MM-dd') + '_04:00:00_JST' : '',
      f: 'live',
      pf: 'on',
    })

    return (
      <>
        <SwitchUI
          primaryChildren={<CardFormat personalDataList={personalDataList} />}
          primaryButtonText={'リスト表示に切り替え'}
          secondaryChildren={<ListFormat personalDataList={personalDataList} />}
          secondaryButtonText={'カード表示に切り替え'}
        />
        {twitterSearchLink !== '' && (
          <RichButton as={A} openInNewTab href={twitterSearchLink}>
            当日の同行者のツイートを見る
          </RichButton>
        )}
      </>
    )
  },
} as const satisfies ArticleParts
