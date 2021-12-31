import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";

const Copyright: NextPage = () => {
    return (
        <Layout>
            <Title title={'著作権について'}>
                <p>
                    2021年7月13日改訂
                </p>
            </Title>
            <Block>
                <p>
                    当サイト内のコンテンツ（文章、イラスト、画像、その他）の著作権は、著作権法によって権利が守られています。
                    それらのコンテンツを管理者の許諾無く無断で使用・複製・改変・公開及び領布することを一切禁止します。
                </p>
                <p>
                    ただし、以下のコンテンツに関してはクリエイティブ・コモンズライセンスの下において使用が<strong>許可</strong>されます。
                </p>
            </Block>
            <Block title={'再利用が許可されるコンテンツ'} h2icon={'none'}>
                <p>
                    以下のページ内の<strong>画像</strong>は再利用が許可されています。
                </p>
                <ul>
                    <li>
                        <Link href={'/icons'}>
                            <a>Icons</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/stickers'}>
                            <a>Stickers</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/balloon'}>
                            <a>Balloons</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/download'}>
                            <a>Download</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/iconmaker'}>
                            <a>Icon Maker</a>
                        </Link>
                    </li>
                </ul>

                <p>
                    これらの作品は
                    <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">クリエイティブ・コモンズ 表示-非営利-継承 4.0国際ライセンス</a>
                    の下に提供されます。
                </p>
                <p>
                    すなわち、次のことが要求・許可されます。
                </p>
                <ul>
                    <li>画像を<strong>改変して利用</strong>することができます。</li>
                    <li>改変した作品を利用する際はクレジットとして<strong>私(つまみ)の名前を明示</strong>する必要があります。</li>
                    <li>改変された作品は<strong>同じライセンス</strong>で提供する必要があります。</li>
                    <li><strong>商用利用は禁止</strong>します。</li>
                </ul>
                ただし私が許可した場合はこの限りではありません。
            </Block>


            <Link href={'/legal'}>
                <a className={'linkButton'}>戻る</a>
            </Link>
        </Layout>
    )
}

export default Copyright
