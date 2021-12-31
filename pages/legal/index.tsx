import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

const Index: NextPage = () => {
    return (
        <Layout>
            <Title title={'Legal Information'} />
            <Block title={'プライバシーポリシー'}>
                <p>
                    以下のページでは当サイトでお預かりした個人情報の管理の方法について説明しています。
                </p>
                <p>
                    <Link href={'/legal/privacy'}>
                        <a className={'linkButton'}>プライバシーポリシー</a>
                    </Link>
                </p>
            </Block>
            <Block title={'免責事項'}>
                <p>
                    以下のページでは免責事項について説明しています。
                </p>
                <p>
                    <Link href={'/legal/disclaimer'}>
                        <a className={'linkButton'}>免責事項</a>
                    </Link>
                </p>
            </Block>
            <Block title={'著作権について'}>
                <p>
                    以下のページでは当サイト上に掲載されたコンテンツの権利について説明しています。
                </p>
                <p>
                    <Link href={'/legal/copyright'}>
                        <a className={'linkButton'}>著作権について</a>
                    </Link>
                </p>
            </Block>
        </Layout>
    )
}

export default Index
