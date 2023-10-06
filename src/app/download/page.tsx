import path from 'path'

import { Metadata } from 'next'

import Image from 'next/legacy/image'
import ReactMarkdown from 'react-markdown'

import { Button } from '@/components/atoms/Button'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import readMarkdowns from '@/lib/mdLoader'

export const metadata = {
  title: 'DLコンテンツ',
  description: '壁紙などダウンロードできるコンテンツの提供ページです。',
} satisfies Metadata

type Frontmatter = {
  title: string
  description: string
  image: {
    src: string
    alt?: string
    width: number
    height: number
  }
  links: {
    href: string
    text: string
  }[]
  date: `${number}/${number}/${number}`
}

export default async function Index() {
  const contents = await readMarkdowns<Frontmatter>(
    path.join(process.cwd(), 'src', 'app', 'download', 'contents'),
  )

  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description} />
      {contents.map(({ metadata, content }) => {
        return (
          <Block key={metadata.title} title={metadata.title}>
            <p>{metadata.description}</p>
            {metadata.image && (
              <div className={'hero_image'}>
                <Image
                  src={metadata.image.src}
                  width={metadata.image.width}
                  height={metadata.image.height}
                  className={'rich_image'}
                  layout={'intrinsic'}
                  alt={metadata.image.alt}
                />
              </div>
            )}
            <ReactMarkdown>{content}</ReactMarkdown>
            <div
              style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}
            >
              {metadata.links.map(({ href, text }) => (
                <Button key={href} href={href}>
                  {text}
                </Button>
              ))}
            </div>
          </Block>
        )
      })}
    </MainWrapper>
  )
}
