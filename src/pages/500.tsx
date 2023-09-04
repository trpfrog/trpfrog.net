import { NextPage } from 'next'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Title from '@/components/organisms/Title'

const TrpFrog500: NextPage = () => {
  const IB = ({ children }: any) => (
    <span style={{ display: 'inline-block' }}>{children}</span>
  )
  return (
    <Layout>
      <Title
        title={'500 Internal Server Error'}
        showDefaultText={false}
        style={{ textAlign: 'center', padding: '3rem 0' }}
      >
        <h1 style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3em', color: 'var(--header-color)' }}>
            500
          </div>
          <div style={{ fontSize: '0.9em' }}>Internal Server Error</div>
        </h1>
        <div
          style={{
            marginTop: '1rem',
            filter: 'drop-shadow(0 0 10px lightgray)',
          }}
        >
          <Image src={'sorry'} width={300} height={300} alt={'500の画像'} />
        </div>
        <div style={{ padding: '0 1em' }}>
          <p>
            ご迷惑をおかけしております。サーバサイドでの問題が発生しています。
          </p>
          <p>
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
              <ul>
                <li>Issue を立てる</li>
                <li>Twitter で連絡する</li>
                <li>メールで連絡する</li>
              </ul>
            </div>
            <div>
              などの手段で管理者 (つまみ) まで報告してくださると幸いです。
            </div>
          </p>
        </div>
        <p className={'link-area'}>
          <Link href={'https://github.com/trpfrog/trpfrog.net/issues'}>
            GitHub Issues
          </Link>
          <Link href={'https://twitter.com/trpfrog'}>Twitter</Link>
          <Link href={'/'}>トップページに戻る</Link>
        </p>
      </Title>
    </Layout>
  )
}

export default TrpFrog500
