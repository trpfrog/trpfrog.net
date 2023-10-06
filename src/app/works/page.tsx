import path from 'path'

import React from 'react'

import { Metadata } from 'next'

import Image from 'next/legacy/image'
import ReactMarkdown from 'react-markdown'

import { Button } from '@/components/atoms/Button'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import readMarkdowns from '@/lib/mdLoader'

import styles from './style.module.scss'

type KeywordsType = {
  keywords: string[]
}

const Keywords: React.FC<KeywordsType> = ({ keywords }) => {
  return (
    <p className={styles.keywords}>
      <span className={styles.keyword_title}>TECHNOLOGIES</span>
      <br />
      {keywords.map(k => (
        <span key={k} className={styles.keyword}>
          {k}
        </span>
      ))}
    </p>
  )
}

type Frontmatter = {
  title: string
  h2icon?: string
  image?: {
    path: string
    width: number
    height: number
  }
  keywords?: string[]
  links?: {
    [key: string]: string
  }
  date: `${number}/${number}/${number}`
}

export const metadata = {
  title: 'Works',
  description:
    'つまみさんの作った作品・ソフトウェア・Webサイトのまとめページです。',
} satisfies Metadata

export default async function Index() {
  // load all md files under /app/works/contents/*.md
  const contents = await readMarkdowns<Frontmatter>(
    path.join(process.cwd(), 'src', 'app', 'works', 'contents'),
  )

  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description}>
        <p>最終更新: 2023/5/31</p>
      </Title>
      {contents.map(({ metadata, content }) => {
        return (
          <Block
            key={metadata.title}
            title={metadata.title}
            // @ts-ignore
            h2icon={metadata.h2icon ?? 'trpfrog'}
          >
            {metadata.image && (
              <div className={styles.hero_image}>
                <Image
                  src={metadata.image?.path}
                  width={metadata.image?.width}
                  height={metadata.image?.height}
                  objectFit={'cover'}
                  alt={metadata.title + 'の画像'}
                />
              </div>
            )}
            {metadata.keywords && <Keywords keywords={metadata.keywords} />}
            <p>
              <b>Released:</b> {metadata.date}
            </p>
            <ReactMarkdown>{content}</ReactMarkdown>
            <p
              style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}
            >
              {Object.entries(metadata.links ?? {}).map(([linkTxt, url]) => {
                return (
                  <Button
                    externalLink={true}
                    key={linkTxt}
                    href={url as string}
                  >
                    {linkTxt}
                  </Button>
                )
              })}
            </p>
          </Block>
        )
      })}
    </MainWrapper>
  )
}
