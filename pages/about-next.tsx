import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

const About: NextPage = () => {
    return (
        <Layout>
            <Title title={'大規模改修情報'} description={'つまみネットの大規模改修について説明します。'}/>
            <Block title={'これは何？'}>
                <p>
                    これまでのつまみネットは HTML + CSS + JavaScript
                    のほぼ完全<strong>手打ち</strong>で作成していました。
                </p>
                <p>
                    これはこれでとても勉強になって良かったのですが、
                    流石にやることが少なくなってきた (あるけど労力と成果が見合わなそうなことがたくさん)
                    のとオタクのおすすめもあり、
                    <a href="https://nextjs.org/">Next.js</a> を使ってほぼ一から書き直しました。
                </p>
                <p>
                    今回、今までと比べて<strong>かなり軽い</strong>サイトができたので、
                    「古代技術で作られた今までの激重サイトから早く引越ししたい！」
                    と早期での移行を決めました。
                    というのも、<strong>いくつかのコンテンツは移行が終わっていません。(は？)</strong>
                </p>
                <p>
                    そのことも含めて、このページでは<strong>いくつかの変更点</strong>を説明します。
                </p>
                <p>
                    なお、以前のサイトは <a href="https://old.trpfrog.net/">old.trpfrog.net</a>{' '}
                    で公開しています。
                </p>
            </Block>
            <Block title={'無くしたもの'}>
                <h3>Statsの削除</h3>
                <p>
                    今まで Web Storage API を用いて<b>風船を割った数</b>を記録してトップページに表示していましたが、
                    思ったよりも保存期間が短く、せっかく割っても記録があまり残りませんでした。
                    あと単純に面白くなかったので削除しました。(あと実装が面倒だった)
                </p>
                <h3>Walkingページの中身入れ替え</h3>
                <p>
                    今までは過去の徒歩を全部紹介していましたが、
                    更新がつらすぎるのでブログ記事へのリンクまとめサイトに変えました。
                </p>
            </Block>
            <Block title={'新しい要素'}>
                <h3>相互リンク</h3>
                <p>
                    相互リンクが増えてきてトップページが巨大になってきたので単独ページにお引越ししました。
                </p>
                <p>
                    <Link href={'links'}>
                        <a className={'linkButton'}>Links</a>
                    </Link>
                </p>
                <h3>Works</h3>
                <p>
                    作ったやつをまとめるページを作りました。
                </p>
                <p>
                    <Link href={'works'}>
                        <a className={'linkButton'}>Works</a>
                    </Link>
                </p>
                <h3>ページ遷移トランジションの追加</h3>
                <p>
                    ライブラリが使いやすくなったので「すごいだろう！」
                    がやりたいがためにトランジションを追加しました。
                    普通に見にくい気がするので気分で消すかもしれません。(は？)
                </p>
            </Block>
            <Block title={'リニューアル'}>
                <h3>デザインの変更</h3>
                <p>
                    「緑の背景に黒い文字は読みにくいよね」ということで配色をかなり変えました。
                </p>
                <p>
                    それと現在いるページが分かりやすいようにナビゲーションバーのデザインも少し変えました。
                </p>


                <h3>アイコンメーカーのTypeScript移行</h3>
                <p>
                    JavaScriptで書いていたアイコンメーカーをTypeScriptで書き直しました。
                </p>
                <p>
                    若干バグがあるので、気に食わない人は{' '}
                    <a href="https://old.trpfrog.net/iconmaker">ここ</a>{' '}
                    から古いバージョンを使ってください。(まず使う人はいないが……)
                </p>
                <h3>風船コーナーのTypeScript移行</h3>
                <p>
                    JavaScriptで書いていた風船コーナーをTypeScriptで書き直しました。
                </p>
                <p>
                    風船を増やす操作がリアルタイムでできて良い感じです。
                </p>
                <h3>画像置き場にCloudinaryを使用</h3>
                <p>
                    <a href="https://cloudinary.com/">Cloudinary</a>
                    はデバイスに最適なサイズで画像を落とすらしいのでより軽いサイトになる……はずです。
                </p>
            </Block>
            <Block title={'未実装の要素'}>
                <h3>Random Notes (雑ブログ)</h3>
                <p>
                    雑ブログは移行に難航しているため未実装です。過去の記事は{' '}
                     <a href="https://old.trpfrog.net/notes">old.trpfrog.net/notes</a>{' '}
                    から見られるようにしているのでゆるしてください。リダイレクトも設定しています。
                </p>
                <p>
                    できるだけ早く移行できるように頑張ります。
                </p>
            </Block>
            <details>
                <summary>移行前の内容を表示</summary>
                <div style={{display: 'grid', gap: '2em'}}>
                    <div/>
                    <Block title={'なぜ Next.js に移行するの？'}>
                        <ul style={{padding: '10px'}}>
                            <li>HTML/CSS/JavaScript で一から作る温かみのあるサイト作りも楽しいけど、
                                周辺ツール作りでちょっとつらくなってきた</li>
                            <li>あと単純にNext.jsが面白そうだった</li>
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
                                <li>法律関係の文書ページを追加</li>
                                <li>デザインをかなり変更</li>
                                <ul>
                                    <li>やっぱり白地に黒字が一番読みやすいですよねという</li>
                                    <li>ヘッダーのデザインを若干変更</li>
                                    <ul>
                                        <li>つまみアイコンの位置を変更</li>
                                        <li>PC用のヘッダーを薄くして小さい画面でも見やすくした</li>
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
                                </ul>
                            </ul>
                            <li>2022/1/1</li>
                            <ul>
                                <li>あけましておめでとうございます。本年もよろしくお願いします。</li>
                                <li>風船ページを追加 🎉</li>
                            </ul>
                            <li>2022/1/3</li>
                            <ul>
                                <li>Worksページを追加 🎉</li>
                                <li>徒歩記事まとめページを追加 🎉</li>
                                <li>フッターの著作権の年を 2019 - 2022 に変更</li>
                                <li>ダウンロードコンテンツページを追加 🎉</li>
                                <li>アイコンメーカーをTypeScriptで書き直しました 🎉</li>
                                <li>トップに戻るボタンを追加</li>
                                <li>Twitterカード等のメタデータを追加</li>
                                <li>ナビゲーションバーのデザインを変更</li>
                                <li>ページトランジションを追加</li>
                                <ul>
                                    <li>あまり気に入っていない</li>
                                    <li>本当はクロスフェードにしたいがやり方がよくわからず……</li>
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
                                <li>上に戻るボタンの移植</li>
                            </ul>
                        </ul>
                    </Block>
                </div>
            </details>

        </Layout>
    )
}

export default About

