import Image from 'next/image'
import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Title } from '@/components/organisms/Title'

export default function NotFound() {
  return (
    <MainWrapper gridLayout>
      <Title
        title={'404 Not Found'}
        showDefaultText={false}
        style={{ textAlign: 'center', padding: '3rem 0' }}
      >
        <h1 style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3em', color: 'var(--header-color)' }}>404</div>
          <div style={{ fontSize: '0.9em' }}>Not Found</div>
        </h1>
        <div className="tw-mt-4 tw-grid tw-place-items-center">
          <Image src="/images/404.png" width={300} height={300} alt="" />
        </div>
        <div style={{ padding: '0 1em' }}>
          <p>
            <span className="tw-inline-block">このページは</span>
            <span className="tw-inline-block">存在しません。</span>
            <br />
            <span className="tw-inline-block">サイトの工事中または</span>
            <span className="tw-inline-block">リンクが誤っている可能性があります。</span>
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
