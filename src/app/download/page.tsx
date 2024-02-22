import path from 'path'

import { Metadata } from 'next'

import { MDXRemote } from 'next-mdx-remote/rsc'

import { WorksFrontmatterSchema } from '@/app/download/schema'

import { Image } from '@/components/atoms/Image'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import { readMarkdowns } from '@/lib/mdLoader'

import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

import { MagicButton } from 'src/components/atoms/MagicButton'

export const metadata = {
  title: 'DLコンテンツ',
  description: '壁紙などダウンロードできるコンテンツの提供ページです。',
} satisfies Metadata

export default async function Index() {
  const contents = await readMarkdowns(
    path.join(process.cwd(), 'src', 'app', 'download', 'contents'),
    WorksFrontmatterSchema,
  )

  return (
    <MainWrapper gridLayout>
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
                  alt={metadata.image.alt}
                />
              </div>
            )}
            <MDXRemote source={content} {...getMarkdownOptions()} />
            <div
              style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}
            >
              {metadata.links.map(({ href, text }) => (
                <MagicButton key={href} href={href}>
                  {text}
                </MagicButton>
              ))}
            </div>
          </Block>
        )
      })}
    </MainWrapper>
  )
}
