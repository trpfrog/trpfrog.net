import React from 'react'

import { Metadata } from 'next'

import styles from '@/app/(home)/page.module.scss'

import MainWrapper from '@/components/atoms/MainWrapper'
import Block from '@/components/molecules/Block'
import Title from '@/components/organisms/Title'

import { loadMutualLinkRecords, MutualLinkRecord } from './loader'
import { MutualLinkBlock } from './MutualLinkBlock'

export const metadata = {
  title: '相互リンク',
  description: 'オタク各位のWebサイトです。',
} satisfies Metadata

export default async function Index() {
  const mutualLinks: MutualLinkRecord[] = await loadMutualLinkRecords()
  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description}>
        <p>
          順番はハンドルネームをUTF-8でソートしたもの。
          <s>片想いリンクになったやつもある</s>
        </p>
      </Title>
      <Block>
        <div className={styles.link_grid}>
          {mutualLinks.map(record => (
            <MutualLinkBlock record={record} key={record.url} />
          ))}
        </div>
      </Block>
    </MainWrapper>
  )
}
