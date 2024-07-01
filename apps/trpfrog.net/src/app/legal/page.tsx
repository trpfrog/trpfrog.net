import Link from 'next/link'

import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

export const metadata = {
  title: 'Legal Information',
}

export default function LegalPage() {
  return (
    <>
      <Title title={'Legal Information'} />

      <Block title={'プライバシーポリシー'}>
        <p>以下のページでは当サイトでお預かりした個人情報の管理の方法について説明しています。</p>
        <RichButton as={Link} href={'/legal/privacy'}>
          プライバシーポリシー
        </RichButton>
      </Block>

      <Block title={'免責事項'}>
        <p>以下のページでは免責事項について説明しています。</p>
        <RichButton as={Link} href={'/legal/disclaimer'}>
          免責事項
        </RichButton>
      </Block>

      <Block title={'著作権について'}>
        <p>以下のページでは当サイト上に掲載されたコンテンツの権利について説明しています。</p>
        <RichButton as={Link} href={'/legal/copyright'}>
          著作権について
        </RichButton>
      </Block>
    </>
  )
}
