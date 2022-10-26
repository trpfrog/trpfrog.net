import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

const Privacy: NextPage = () => {
  return (
    <Layout>
      <Title title={'プライバシーポリシー'}>
        <p>
          2021年7月13日改訂
        </p>
      </Title>
      <Block title={'個人情報の利用目的'} h2icon={'none'}>
        <p>
          つまみネット (以下、「当サイト」と言います。) はお問い合わせや記事へのコメントの際、
          名前やメールアドレス等の個人情報を入力いただく場合がございます。
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、
          これらの目的以外では利用いたしません。
        </p>
      </Block>
      <Block title={'アップロードされたファイルの利用目的'} h2icon={'none'}>
        <p>
          当サイトが提供するサービスにおいて画像ファイルをアップロードしていただく場合がございます。
          これらはサービスの提供のためのみ利用させていただくものであり、
          これらの目的以外では利用いたしません。
        </p>
      </Block>
      <Block title={'アクセス解析ツールについて'} h2icon={'none'}>
        <p>
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
          トラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p>
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
          この規約に関しての詳細は
          <a href="https://marketingplatform.google.com/about/analytics/terms/jp/">Googleアナリティクスサービス利用規約</a>
          と
          <a href="https://policies.google.com/technologies/ads?hl=ja">Googleポリシーと規約</a>
          をご覧ください。
        </p>
      </Block>
      <Block title={'プライバシーポリシーの変更について'} h2icon={'none'}>
        <p>
          当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
          修正された最新のプライバシーポリシーは常に本ページにて開示されます。
        </p>
      </Block>

      <Link href={'/legal'} className={'linkButton'}>
        戻る
      </Link>
    </Layout>
  );
}

export default Privacy
