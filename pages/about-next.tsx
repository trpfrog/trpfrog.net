import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

const About: NextPage = () => {
    return (
        <Layout>
            <Title title={'next.つまみネット について'}>
                <p>
                    ここは Next.js + TypeScript で<Link href={'https://trpfrog.net'}><a>つまみネット</a></Link>
                    を書き直す実験ページです。工事中です。
                </p>
                <p>
                    うまくいけば将来的につまみネットをNext.js製のこれで置き換えたいと考えています。
                </p>
            </Title>
            <Block title={'なぜ？'}>
                <ul style={{padding: '10px'}}>
                    <li>HTML/CSS/JavaScript で一から作る温かみのあるサイト作りも楽しいけど、
                        周辺ツール作りでちょっとつらくなってきた</li>
                    <li>あと単純にNext.jsが面白そうだった</li>
                </ul>
            </Block>
            <Block title={'移植状況'} h2icon={'robot'}>
                <ul style={{padding: '10px'}}>
                    <li>2021/12/24</li>
                    <ul>
                        <li>サイトの共通部分をだいたい移植した</li>
                        <li>作業環境ページをほぼ100%移植した</li>
                    </ul>
                    <li>2021/12/27</li>
                    <ul>
                        <li>リンク集を移植した</li>
                        <li>トップページの体裁を整えた 🎉</li>
                    </ul>
                    <li>2021/12/28</li>
                    <ul>
                        <li>リンク集の形式を見やすく変えた</li>
                        <li>画像サーバにCloudinaryを採用して高速化</li>
                        <ul>
                            <li><b>既知の問題:</b> 設定が間違っているのかサーバの応答が異様に遅い</li>
                        </ul>
                        <li>スタンプ一覧ページを追加</li>
                        <li>ストアリンクをトップページに追加</li>
                        <li>つまみのうた情報をトップページに追加</li>
                        <li>つまみのうたの歌詞を追加 🎉</li>
                        <li>プロフィールを追加 🎉</li>
                        <li>仮のサイト内リンク集を作成</li>
                    </ul>
                    <li>2021/12/30</li>
                    <ul>
                        <li>アイコン集のページを追加 🎉</li>
                        <li>スタンプ集・アイコン集に拡大表示を追加 🎉</li>
                        <li>相互リンクが増えてきたので移動</li>
                        <li>トップページにアイコン紹介を追加</li>
                        <li>Statsの廃止に関する案内を追加</li>
                        <li>GlobalなCSSにSCSSを採用</li>
                    </ul>
                    <li>2021/12/31</li>
                    <ul>
                        <li>ハンバーガーメニューを追加 🎉</li>
                        <li>デザインをかなり変更</li>
                        <ul>
                            <li>やっぱり白地に黒字が一番読みやすいですよねという</li>
                            <li>PC用のヘッダーを薄くして小さい画面でも見やすくした</li>
                            <ul>
                                <li>実は更なる改善案を考えているが、実装が大変そうなのでまた今度</li>
                            </ul>
                            <li>更にフラットデザインを意識してぼけた要素(はっきりしない影)も排除した</li>
                            <li>li要素のbullet(箇条書きの点)のデザインもしっかり自分で用意した</li>
                            <li>ナビゲーションバーとヘッダーが重なるところも色を塗った(？)</li>
                            <ul>
                                <li>スマホで上に素早くスクロールするとnavバーとヘッダーの間に一瞬白い隙間が見えるアレを改善</li>
                                <li>超高速でやるとまだ見えるけどブラウザの仕様っぽいので流石にそれはどうしようもできない</li>
                            </ul>
                            <li>緑色のボタンのデザインをもっと丸く変更した</li>
                            <li><b>既知の問題:</b> ちょっとページタイトルと説明が配色的に読みにくい</li>
                        </ul>
                    </ul>
                </ul>
            </Block>
            <Block title={'Todo'} h2icon={'think'}>
                <ul style={{padding: '10px'}}>
                    <li><b>頑張るぞ</b></li>
                    <ul>
                        <li>Random notesの移植</li>
                        <li>つまみログの移行</li>
                    </ul>
                    <li><b>簡単そうだから気が向いたらやるかも</b></li>
                    <ul>
                        <li>ダウンロードページの移植</li>
                        <li>上に戻るボタンの移植</li>
                    </ul>
                    <li><b>大変そうだからやりたくないよ〜</b></li>
                    <ul>
                        <li>風船コーナーの移植</li>
                        <li>アイコンメーカーの移植</li>
                        <li>徒歩紹介ページの移植</li>
                    </ul>
                </ul>
            </Block>
            <Block title={'やってみてどう？'} h2icon={'ice'}>
                <ul style={{padding: '10px'}}>
                    <li>共通部分を作るのが楽</li>
                    <li>ただフレームワークなしの方が融通が効くところもあり、ちょっと書くのがつらい</li>
                    <li>でも慣れと知識量の問題っぽくはある</li>
                    <li>完全移植はまだ先が長そうでｸﾞｴ-という感じ</li>
                </ul>
            </Block>
        </Layout>
    )
}

export default About

