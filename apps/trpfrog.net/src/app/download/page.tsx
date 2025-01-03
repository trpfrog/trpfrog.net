import * as path from 'path'

import { MDXRemote } from 'next-mdx-remote/rsc'

import { WorksFrontmatterSchema } from '@/app/download/schema'

import { Image } from '@/components/atoms/Image'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { createMetadataWithTitle } from '@/components/organisms/Title'
import { A } from '@/components/wrappers'

import { readMarkdowns } from '@/lib/mdLoader'

import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

export const metadata = createMetadataWithTitle({
  title: 'Download',
  description: '壁紙などダウンロードできるコンテンツの提供ページです。',
})

export default async function Index() {
  const contents = await readMarkdowns(
    path.join(process.cwd(), 'src', 'app', 'download', 'contents'),
    WorksFrontmatterSchema,
  )

  return (
    <MainWrapper gridLayout>
      <metadata.Title />
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
            <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}>
              {metadata.links.map(({ href, text }) => (
                <RichButton as={A} key={href} href={href}>
                  {text}
                </RichButton>
              ))}
            </div>
          </Block>
        )
      })}
    </MainWrapper>
  )
}
