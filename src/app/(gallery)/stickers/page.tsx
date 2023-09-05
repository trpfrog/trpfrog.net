import type { Metadata } from 'next'

import ImageList, { ImagePaths } from '@/app/(gallery)/_components/ImageList'

import MainWrapper from '@/components/atoms/MainWrapper'
import Block from '@/components/molecules/Block'
import Title from '@/components/organisms/Title'

export const metadata = {
  title: 'スタンプ素材集',
  description: 'つまみスタンプの素材集です',
} satisfies Metadata

export default function Index() {
  const imagePaths: ImagePaths[] = Array.from(Array(80), (v, k) => k).map(i => {
    return {
      src: 'stickers/' + i,
      url: '/stickers/' + i,
    }
  })

  return (
    <MainWrapper>
      <Title title={metadata.title}>
        <p>
          つまみスタンプの元画像の5倍に拡大したやつです。
          <br />
          良識の範囲内でご自由にどうぞ。(Twitterの会話とか)
        </p>
        <a href={'https://store.line.me/stickershop/product/8879469/ja'}>
          LINEスタンプ発売中！
        </a>
      </Title>
      <Block>
        <ImageList images={imagePaths} />
      </Block>
    </MainWrapper>
  )
}
