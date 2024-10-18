import { Metadata } from 'next'

import Link from 'next/link'

import { ImageNavigation } from '@/app/(gallery)/_components/ImageNavigation'
import { ImageViewer } from '@/app/(gallery)/_components/ImageViewer'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'

const NUMBER_OF_IMAGES = 80

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export const metadata = {
  title: 'スタンプビューア',
} satisfies Metadata

export async function generateStaticParams() {
  const ids = Array.from(Array(NUMBER_OF_IMAGES), (_, k) => k)
  return ids.map(id => ({ id: id.toString() }))
}

export default async function Index(context: PageProps) {
  const id = (await context.params).id
  const idInt = parseInt(id, 10)

  return (
    <MainWrapper gridLayout>
      <Block>
        <ImageViewer src={'stickers/' + id} alt={id + '番目のスタンプ画像'} />
      </Block>
      <Block>
        <ImageNavigation
          icons={Array.from(Array(5), (_, k) => k)
            .map(k => (idInt + k - 2 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES)
            .map(k => ({
              key: k,
              src: 'stickers/' + k,
              alt: k + '番目のスタンプ画像',
            }))}
          nextHref={'/stickers/' + ((idInt + 1) % NUMBER_OF_IMAGES).toString()}
          prevHref={'/stickers/' + ((idInt - 1 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES).toString()}
        />
      </Block>
      <Block>
        <div style={{ textAlign: 'center' }}>
          <RichButton as={Link} href={'/stickers'}>
            一覧に戻る
          </RichButton>
        </div>
      </Block>
      <Block title={'既知のバグ'}>
        <p>画像のロードが遅すぎてページ遷移をしていないように見える</p>
      </Block>
    </MainWrapper>
  )
}
