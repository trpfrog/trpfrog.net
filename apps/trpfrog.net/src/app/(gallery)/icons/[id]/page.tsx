import { Metadata } from 'next'

import Link from 'next/link'
import { RichButton } from 'src/components/atoms/RichButton'

import { ImageNavigation } from '@/app/(gallery)/_components/ImageNavigation'
import { ImageViewer } from '@/app/(gallery)/_components/ImageViewer'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'


const NUMBER_OF_IMAGES = 33

type PageProps = {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'アイコンビューア',
} satisfies Metadata

export async function generateStaticParams() {
  const ids = Array.from(Array(NUMBER_OF_IMAGES), (v, k) => k)
  return ids.map(id => ({ id: id.toString() }))
}

export default function Index(context: PageProps) {
  const id = context.params.id
  const idInt = parseInt(id)
  return (
    <MainWrapper gridLayout>
      <Block>
        <ImageViewer src={'icons_gallery/' + id} alt={id + '番目のアイコン'} />
      </Block>
      <Block>
        <ImageNavigation
          icons={Array.from(Array(5), (v, k) => k)
            .map(k => (idInt + k - 2 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES)
            .map(k => ({
              key: k,
              src: 'icons_gallery/' + k,
              alt: k + '番目のアイコン',
            }))}
          nextHref={'/icons/' + ((idInt + 1) % NUMBER_OF_IMAGES).toString()}
          prevHref={'/icons/' + ((idInt - 1 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES).toString()}
        />
      </Block>
      <Block>
        <div style={{ textAlign: 'center' }}>
          <RichButton as={Link} href={'/icons'}>
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
