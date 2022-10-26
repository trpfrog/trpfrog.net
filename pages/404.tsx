import {NextPage} from "next";
import Layout from "../components/Layout";
import Link from 'next/link';
import Image from "next/legacy/image";
import Title from "../components/Title";

const TrpFrog404: NextPage = () => {
  const IB = ({children}: any) => (
    <span style={{display: 'inline-block'}}>{children}</span>
  )
  return (
    <Layout>
      <Title
        title={'404 Not Found'}
        showDefaultText={false}
        style={{textAlign: 'center', padding: '3rem 0'}}
      >
        <h1 style={{textAlign: 'center'}}>
          <div style={{fontSize: '3em', color: 'var(--header-color)'}}>
                        404
          </div>
          <div style={{fontSize: '0.9em'}}>
                        Not Found
          </div>
        </h1>
        <div style={{marginTop: '1rem'}}>
          <Image
            src={'404'}
            width={300}
            height={300}
            alt={'404の画像'}
          />
        </div>
        <div style={{padding: '0 1em'}}>
          <p>
            <IB>このページは</IB><IB>存在しません。</IB>
            <br/>
            <IB>サイトの工事中または</IB>
            <IB>リンクが誤っている可能性があります。</IB>
          </p>
          <p>
            <Link href={'/'} className={'linkButton'}>
                            トップページに戻る
            </Link>
          </p>
        </div>

      </Title>
    </Layout>
  );
}

export default TrpFrog404;
