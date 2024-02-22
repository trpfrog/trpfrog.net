import path from 'path'

import { Metadata } from 'next'

import { MDXRemote } from 'next-mdx-remote/rsc'

import { Image } from '@/components/atoms/Image'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import { readMarkdowns } from '@/lib/mdLoader'

import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

import { MagicButton } from 'src/components/atoms/MagicButton'

import { Keywords } from './Keywords'

export type WorksFrontmatter = {
  title: string
  subtitle?: string
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
  const contents = await readMarkdowns<WorksFrontmatter>(
    path.join(process.cwd(), 'src', 'app', 'works', 'contents'),
  )

  return (
    <MainWrapper gridLayout>
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
              <Image
                className="tw-mx-auto tw-my-4 tw-bg-transparent"
                src={metadata.image?.path}
                width={metadata.image?.width}
                height={metadata.image?.height}
                alt={metadata.title + 'の画像'}
              />
            )}
            {metadata.keywords && <Keywords keywords={metadata.keywords} />}
            <p>
              <b>Released:</b> {metadata.date}
            </p>
            <MDXRemote source={content} {...getMarkdownOptions()} />
            <p
              style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}
            >
              {Object.entries(metadata.links ?? {}).map(([linkTxt, url]) => {
                return (
                  <MagicButton
                    externalLink={true}
                    key={linkTxt}
                    href={url as string}
                  >
                    {linkTxt}
                  </MagicButton>
                )
              })}
            </p>
          </Block>
        )
      })}
    </MainWrapper>
  )
}
