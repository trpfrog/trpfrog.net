import Link from 'next/link'
import Title from "../../components/Title";
import Block from "../../components/Block";

import IconMakerApp from "./IconMakerApp";
import {Metadata} from "next";

export const metadata = {
  title: 'アイコンメーカー',
  description: 'つまみさんのアイコンメーカーです。'
} satisfies Metadata

export default function Index() {
  return (
    <div id="main_wrapper">
      <Title
        title={'アイコンメーカー.ts'}
        ribbonText={'BETA'}
        description={'TypeScriptで書き直したアイコンメーカーです。'}
        cardImageUrl={'/images/icon_maker/TwitterCardIconmaker.png'}
      >
        <p>
          画像をアップロードしてつまみアイコンを作ろう！<br/>
          作成したアイコンはSNS等のアイコンに使うことができます。
        </p>
      </Title>

      <IconMakerApp />

      <Block title={'ご利用条件・免責事項'}>
        <p>
          当サービスは第三者の権利を侵害したり、 公序良俗や法律に反するような用途にはご利用いただけません。
          また、当サービスを使用したことにより発生したいかなる損害に対しても、 当サイトは一切の責任を負いません。
        </p>
        <p>
          {/* @ts-ignore */}
          詳しくは<Link href={'/legal'}>こちら</Link>をご覧ください。
        </p>
      </Block>
    </div>
  );
}
