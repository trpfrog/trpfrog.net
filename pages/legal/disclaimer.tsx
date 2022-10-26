import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

const Disclaimer: NextPage = () => {
  return (
    <Layout>
      <Title title={'免責事項'}>
        <p>
                    2021年7月13日改訂
        </p>
      </Title>
      <Block>
        <p>
                    当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
        </p>
        <p>
                    当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
        </p>
        <p>
                    当サイトに掲載された内容や提供しているサービスにより生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>
      </Block>
      <Link href={'/legal'} className={'linkButton'}>
                戻る
      </Link>
    </Layout>
  );
}

export default Disclaimer
