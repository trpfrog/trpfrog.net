import dayjs from 'dayjs'
import { z } from 'zod'

import { InlineLink } from '@/components/atoms/InlineLink'
import { A, Li, UnorderedList } from '@/components/wrappers'

import { createURL } from '@/lib/url'

import { SwitchUI } from '@blog/_components/article-parts/ProfileCards/SwitchUI'
import { ArticleParts } from '@blog/_components/ArticleParts'
import { parseObjectList } from '@blog/_lib/rawTextParser'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

import { RichButton } from 'src/components/atoms/RichButton'

import styles from './index.module.scss'

const ProfileDataSchema = z.object({
  name: z.string(),
  club: z.string().optional(),
  twitter: z.string().optional(),
  description: z.string(),
})

export type ProfileData = z.infer<typeof ProfileDataSchema>

const CardFormat = ({
  personalDataList,
}: {
  personalDataList: ProfileData[]
}) => (
  <div className={styles.profile_card_grid}>
    {personalDataList.map((personalData: any) => (
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
          {parseInlineMarkdown(personalData.description)}
        </div>
      </div>
    ))}
  </div>
)

const ListFormat = ({
  personalDataList,
}: {
  personalDataList: ProfileData[]
}) => (
  <UnorderedList>
    {personalDataList.map((personalData: any) => (
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
          <Li>{parseInlineMarkdown(personalData.description)}</Li>
        </UnorderedList>
      </>
    ))}
  </UnorderedList>
)

export const profileCardParts = {
  name: 'profile-cards',
  Component: ({ content, held }: { content: string; held?: string }) => {
    const personalDataList = parseObjectList(content)
      .map(e => ProfileDataSchema.safeParse(e))
      .filter(e => e.success && e.data)
      .map(e => {
        if (e.success) {
          return e.data
        } else {
          throw e.error
        }
      })

    const twitterSearchLink = createURL('/search', 'https://twitter.com/', {
      q: personalDataList.map(e => 'from:' + e.twitter).join(' OR '),
      until: dayjs(held).add(1, 'd').format('YYYY-MM-DD') + '_04:00:00_JST',
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
