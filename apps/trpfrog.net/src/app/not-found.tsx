import Image from 'next/legacy/image'
import Link from 'next/link'
import { RichButton } from 'src/components/atoms/RichButton'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Title } from '@/components/organisms/Title'


const IB = ({ children }: any) => (
  <span className="tw-inline-block">{children}</span>
)

export default function NotFound() {
  return (
    <MainWrapper gridLayout>
      <Title
        title={'404 Not Found'}
        showDefaultText={false}
        style={{ textAlign: 'center', padding: '3rem 0' }}
      >
        <h1 style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3em', color: 'var(--header-color)' }}>
            404
          </div>
          <div style={{ fontSize: '0.9em' }}>Not Found</div>
        </h1>
        <div style={{ marginTop: '1rem' }}>
          <Image src={'404'} width={300} height={300} alt={'404の画像'} />
        </div>
        <div style={{ padding: '0 1em' }}>
          <p>
            <IB>このページは</IB>
            <IB>存在しません。</IB>
            <br />
            <IB>サイトの工事中または</IB>
            <IB>リンクが誤っている可能性があります。</IB>
          </p>
          <p>
            <RichButton as={Link} href={'/'}>
              トップページに戻る
            </RichButton>
          </p>
        </div>
      </Title>
    </MainWrapper>
  )
}
