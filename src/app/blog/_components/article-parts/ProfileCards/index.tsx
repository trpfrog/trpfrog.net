import React from 'react'

import dayjs from 'dayjs'
import { z } from 'zod'

import { Button } from '@/components/atoms/Button'

import { createURL } from '@/lib/url'

import SwitchUI from '@blog/_components/article-parts/ProfileCards/SwitchUI'
import { parseObjectList } from '@blog/_lib/codeBlockParser'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

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
            <a href={'https://twitter.com/' + personalData.twitter}>
              @{personalData.twitter}
            </a>
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
  <ul>
    {personalDataList.map((personalData: any) => (
      <>
        <li key={personalData.name + '-name'}>
          {personalData.name}
          {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
        </li>
        <ul key={personalData.name + '-info'}>
          <li>{personalData.club}</li>
          <li>
            <a href={'https://twitter.com/' + personalData.twitter}>
              @{personalData.twitter}
            </a>
          </li>
          <li>{parseInlineMarkdown(personalData.description)}</li>
        </ul>
      </>
    ))}
  </ul>
)

const ProfileCards = ({
  content,
  held,
}: {
  content: string
  held?: string
}) => {
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
        <Button externalLink={true} href={twitterSearchLink}>
          当日の同行者のツイートを見る
        </Button>
      )}
    </>
  )
}

export default ProfileCards
