import { Metadata } from 'next'

import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import { IconMakerApp } from './IconMakerApp'

export const metadata = {
  title: 'アイコンメーカー',
  description: 'つまみさんのアイコンメーカーです。',
} satisfies Metadata

export default function Index() {
  return (
    <MainWrapper gridLayout>
      <Title
        title="icon-maker.ts"
        ribbonText={'BETA'}
        description={'TypeScriptで書き直したアイコンメーカーです。'}
        cardImageUrl={'/images/icon_maker/TwitterCardIconmaker.png'}
      >
        <p>
          画像をアップロードしてつまみアイコンを作ろう！
          <br />
          作成したアイコンはSNS等のアイコンに使うことができます。
        </p>
      </Title>

      <IconMakerApp />

      <Block title={'ご利用条件・免責事項'}>
        <p>
          当サービスは第三者の権利を侵害したり、
          公序良俗や法律に反するような用途にはご利用いただけません。
          また、当サービスを使用したことにより発生したいかなる損害に対しても、
          当サイトは一切の責任を負いません。
        </p>
        <p>
          詳しくは<Link href={'/legal'}>こちら</Link>をご覧ください。
        </p>
      </Block>
    </MainWrapper>
  )
}
