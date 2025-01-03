import { ImagePaths, ImageList } from '@/app/(gallery)/_components/ImageList'

import { InlineLink } from '@/components/atoms/InlineLink'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { createMetadataWithTitle } from '@/components/organisms/Title'

export const metadata = createMetadataWithTitle({
  title: 'Stickers',
  description: 'つまみスタンプの素材集です',
})

export default function Index() {
  const imagePaths: ImagePaths[] = Array.from(Array(80), (_, k) => k).map(i => {
    return {
      src: 'stickers/' + i,
      url: '/stickers/' + i,
    }
  })

  return (
    <MainWrapper gridLayout>
      <metadata.Title>
        <p>
          つまみスタンプの元画像の5倍に拡大したやつです。
          <br />
          良識の範囲内でご自由にどうぞ。(Twitterの会話とか)
        </p>
        <InlineLink href={'https://store.line.me/stickershop/product/8879469/ja'}>
          LINEスタンプ発売中！
        </InlineLink>
      </metadata.Title>
      <Block>
        <ImageList images={imagePaths} />
      </Block>
    </MainWrapper>
  )
}
