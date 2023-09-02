import { loadMutualLinkRecords, MutualLinkRecord } from './loader'

import styles from '@/app/(home)/style.module.scss'

import Title from '@/components/Title'
import Block from '@/components/Block'
import React from 'react'
import { Metadata } from 'next'
import { MutualLinkBlock } from './MutualLinkBlock'
import MainWrapper from '@/components/MainWrapper'

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
