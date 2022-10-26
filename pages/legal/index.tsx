import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

const Index: NextPage = () => {
  return (
    <Layout>
      <Title title={'Legal Information'} />
      <Block title={'プライバシーポリシー'} h2icon={'none'}>
        <p>
                    以下のページでは当サイトでお預かりした個人情報の管理の方法について説明しています。
        </p>
        <p>
          <Link href={'/legal/privacy'} className={'linkButton'}>
                        プライバシーポリシー
          </Link>
        </p>
      </Block>
      <Block title={'免責事項'} h2icon={'none'}>
        <p>
                    以下のページでは免責事項について説明しています。
        </p>
        <p>
          <Link href={'/legal/disclaimer'} className={'linkButton'}>
                        免責事項
          </Link>
        </p>
      </Block>
      <Block title={'著作権について'} h2icon={'none'}>
        <p>
                    以下のページでは当サイト上に掲載されたコンテンツの権利について説明しています。
        </p>
        <p>
          <Link href={'/legal/copyright'} className={'linkButton'}>
                        著作権について
          </Link>
        </p>
      </Block>
    </Layout>
  );
}

export default Index
