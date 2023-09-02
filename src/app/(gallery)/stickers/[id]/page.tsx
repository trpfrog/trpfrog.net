import Link from 'next/link'
import { Metadata } from 'next'
import Block from '@/components/Block'
import MainWrapper from '@/components/MainWrapper'
import ImageViewer from '@/app/(gallery)/_components/ImageViewer'
import ImageNavigation from '@/app/(gallery)/_components/ImageNavigation'

const NUMBER_OF_IMAGES = 80

type PageProps = {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'スタンプビューア',
} satisfies Metadata

export async function generateStaticParams() {
  const ids = Array.from(Array(NUMBER_OF_IMAGES), (v, k) => k)
  return ids.map(id => ({ id: id.toString() }))
}

export default function Index(context: PageProps) {
  const id = context.params.id
  const idInt = parseInt(id, 10)

  return (
    <MainWrapper>
      <Block>
        <ImageViewer src={'stickers/' + id} alt={id + '番目のスタンプ画像'} />
      </Block>
      <Block>
        <ImageNavigation
          icons={Array.from(Array(5), (v, k) => k)
            .map(k => (idInt + k - 2 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES)
            .map(k => ({
              key: k,
              src: 'stickers/' + k,
              alt: k + '番目のスタンプ画像',
            }))}
          nextHref={'/stickers/' + ((idInt + 1) % NUMBER_OF_IMAGES).toString()}
          prevHref={
            '/stickers/' +
            ((idInt - 1 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES).toString()
          }
        />
      </Block>
      <Block>
        <div style={{ textAlign: 'center' }}>
          <Link href={'/stickers'} className={'linkButton'}>
            一覧に戻る
          </Link>
        </div>
      </Block>
      <Block title={'既知のバグ'}>
        <p>画像のロードが遅すぎてページ遷移をしていないように見える</p>
      </Block>
    </MainWrapper>
  )
}
