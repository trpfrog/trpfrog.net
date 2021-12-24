import {NextPage} from "next";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import Image from "next/image";
import styles from "../styles/environment.module.css";
import GadgetIntro from "../components/GadgetIntro";

const Environment: NextPage = () => {
    return (
        <Layout>
            <Title title="作業環境">
                <p>
                    つまみさんのデスク周りとか所持デバイスとか
                </p>
                <p>
                    Last updated: 2021/12/11
                </p>
                <GadgetIntro name="" imagePath="desk.webp"/>
            </Title>
            <Block title="コンピュータ関係" h2icon="think">

                <h3>コンピュータ</h3>
                <GadgetIntro name="Apple MacBook Pro (2021)" imagePath="computer/macbookpro.webp">
                    <ul>
                        <li>スペースグレイ</li>
                        <li>14 inch Liquid Retina XDR Display</li>
                        <li>Apple M1 Pro</li>
                        <ul>
                            <li>8 core CPU</li>
                            <li>14 core GPU</li>
                            <li>1TB SSD</li>
                            <li>16GB Unified Memory</li>
                        </ul>
                        <li>US配列 Magic Keyboard with TouchID</li>
                        <li>裏にMoft貼ってる</li>
                    </ul>
                </GadgetIntro>

                <h3>モニター</h3>
                <GadgetIntro name="LG UHD Monitor 4K" imagePath="computer/lg4k.webp">
                    <ul>
                        <li>31.5 inch</li>
                        <li>白っぽかったけど頑張って調整した</li>
                        <li>HDMI x2 + DP</li>
                    </ul>
                </GadgetIntro>
                <GadgetIntro name="Philips 246E" imagePath="computer/philips.webp">
                    <ul>
                        <li>23 inch</li>
                        <li>Full HD</li>
                        <li>父が捨てようとしたやつを譲り受けた、のですぐ砂嵐になる</li>
                    </ul>
                </GadgetIntro>

                <h3>Webカメラ</h3>
                <GadgetIntro name="Logicool C270n" imagePath="computer/webcam.webp">
                    <ul>
                        <li>720p</li>
                        <li>30fps</li>
                        <li>オンライン授業はカメラの性能が悪い方が良いと言われています</li>
                    </ul>
                </GadgetIntro>

                <h3>マイク</h3>
                <GadgetIntro name="Sony ECM-PCV80U" imagePath="computer/mic.webp" />

                <h3>キーボード</h3>
                <GadgetIntro name="東プレ REALFORCE TKL for Mac" imagePath="computer/realforce.webp">
                    <ul>
                        <li>R2TL-USVM-BK</li>
                        <li>ブラック + シルバー</li>
                        <li>スイッチ音標準</li>
                        <li>変荷重 (小指の方が軽い)</li>
                        <li>英語配列</li>
                    </ul>
                </GadgetIntro>

                <h3>パームレスト</h3>
                <GadgetIntro name="FILCO Genuine Wood Wrist Rest M size" imagePath="computer/wristrest.webp">
                    <ul>
                        <li>必須</li>
                    </ul>
                </GadgetIntro>

                <h3>マウス</h3>
                <GadgetIntro name="Logicool MX Master 3 for Mac" imagePath="computer/mxmaster.webp">
                    <ul>
                        <li>MagSpeed電磁気スクロール</li>
                        <ul>
                            <li>びゅんびゅんスクロールできて便利</li>
                        </ul>
                        <li>サムホイール (横スクロール)</li>
                        <li>ジェスチャボタン</li>
                        <ul>
                            <li>トラックパッドの3本指ジェスチャを割り当てると便利</li>
                            <li>Mission Controlとかデスクトップ切り替えとか</li>
                        </ul>
                    </ul>
                </GadgetIntro>

                <h3>トラックパッド</h3>
                <GadgetIntro name="Apple Magic Trackpad" imagePath="computer/trackpad.webp">
                    <ul>
                        <li>ホワイト</li>
                        <li>充電はLightning</li>
                        <li>マウスあるからいらなそうだけど無いとかなり不便</li>
                        <li>Appleのトラックパッドは天才すぎなので……</li>
                    </ul>
                </GadgetIntro>
            </Block>

            <Block title="その他デスク周り" h2icon="think">

                <h3>デスク</h3>
                <GadgetIntro name="Flexispot E8 Bamboo" imagePath="desk/flexispot.webp">
                    <ul>
                        <li>電動昇降机</li>
                        <li>天板 140×70×2cm (竹製)</li>
                        <li>高さ調節できるので立ったり座ったりできる</li>
                    </ul>
                </GadgetIntro>

                <h3>イス</h3>
                <GadgetIntro name="なんかのゲーミングチェア"/>

                <h3>時計</h3>
                <GadgetIntro name="RHYTHM 掛け時計" imagePath="desk/amazonclock.webp">
                    <ul>
                        <li>デザイン</li>
                        <ul>
                            <li>Amazonロゴ付き</li>
                            <li>ダンボールっぽい印刷がされている</li>
                        </ul>
                        <li>クオーツ時計</li>
                        <li>単3電池で動く</li>
                    </ul>
                </GadgetIntro>

                <h3>タペストリー</h3>
                <GadgetIntro name="恋する小惑星" imagePath="desk/koias.webp"/>
                <GadgetIntro name="私に天使が舞い降りた！(姫坂乃愛)" imagePath="desk/watatennoa.webp"/>

                <h3>ライトスタンド</h3>
                <GadgetIntro name="黒いライトスタンド" imagePath="desk/blacklightstand.webp"/>
                <GadgetIntro name="中学校の技術の授業で作った謎のスタンド" imagePath="desk/lightstand.webp"/>

                <h3>電球</h3>
                <GadgetIntro name="Philips Hue">
                    <ul>
                        <li>HomeKitに対応しているのでApple Homeから操作できて便利</li>
                    </ul>
                </GadgetIntro>


                <h3>ゲーム機</h3>
                <GadgetIntro name="Nintendo Switch" imagePath="desk/switch.webp">
                    <ul>
                        <li>初代</li>
                        <ul>
                            <li>予約して発売日に受け取りました、ウフフ</li>
                        </ul>
                        <li>SDカード 128GB</li>
                        <li>コントローラ</li>
                        <ul>
                            <li>Joy-Con ネオンブルー/ネオンレッド (付属)</li>
                            <li>Joy-Con ネオングリーン/ネオンピンク</li>
                            <li>Pro Controller</li>
                            <li>Pro Controller (スプラトゥーン)</li>
                            <li>Pro Controller (Xenoblade 2)</li>
                            <li>高校生のわしバイト成金すぎ</li>
                        </ul>
                    </ul>
                </GadgetIntro>

                <h3>ホワイトボード</h3>
                <GadgetIntro name="父からもらった謎のホワイトボード">
                    <ul>
                        <li>サイズはA2ぐらい</li>
                    </ul>
                </GadgetIntro>
            </Block>

            <Block title="持ち歩き端末・小物" h2icon="think">
                <h3>スマートフォン</h3>
                <GadgetIntro name="Apple iPhone 11" imagePath="mobile/iphone.webp">
                    <ul>
                        <li>128GB</li>
                        <li>MoftXをつけている</li>
                    </ul>
                </GadgetIntro>

                <h3>タブレット</h3>
                <GadgetIntro name="Apple iPad Pro (2020)" imagePath="mobile/ipadpro.webp">
                    <ul>
                        <li>128GB</li>
                        <li>with Apple Pencil</li>
                    </ul>
                </GadgetIntro>

                <h3>イヤホン</h3>
                <GadgetIntro name="Apple AirPods Pro" imagePath="mobile/airpodspro.webp">
                    <ul>
                        <li>外部音取り込み</li>
                        <li>ノイズキャンセリング</li>
                        <li>カナル型</li>
                        <ul>
                            <li>カナル型、自分の体に合っていない可能性がある</li>
                            <li>長時間つけてると耳から液が出て最悪</li>
                            <li>初代AirPodsは別に何もならなかったため……</li>
                        </ul>
                    </ul>
                </GadgetIntro>
                <GadgetIntro name="Aftershokz OpenMove" imagePath="mobile/aftershokz.webp">
                    <ul>
                        <li>骨伝導型</li>
                        <li>あまり持ち出さない、家でずっとつけている</li>
                    </ul>
                </GadgetIntro>

                <h3>スマートウォッチ</h3>
                <GadgetIntro name="Apple Watch Series 7" imagePath="mobile/watch.webp">
                    <ul>
                        <li>42mm アルミニウムケース</li>
                        <li>スターライト</li>
                        <li>バンド</li>
                        <ul>
                            <li>ソロループ (サイズ2, スターライト)</li>
                            <li>ブレイデッドソロループ (サイズ1, プライドエディション)</li>
                        </ul>
                    </ul>
                </GadgetIntro>

                <h3>モバイルバッテリー</h3>
                <GadgetIntro name="Anker PowerCore Essential 20000 PD" imagePath="mobile/powercore20k.webp">
                    <ul>
                        <li>USB Power Delivery 対応</li>
                        <li>USB-C x1 + USB-A x1</li>
                        <li>1ポートのみ 18W, 2ポート合計 15W</li>
                        <li>クソデカバッテリー</li>
                        <li>とりあえずこれ持ってけばOKという感じ</li>
                    </ul>
                </GadgetIntro>
                <GadgetIntro name="Anker PowerCore Magnetic 5000" imagePath="mobile/powercoremag.webp">
                    <ul>
                        <li>USB-C x1 + MagSafe/Qi</li>
                        <li>有線 10W, ワイヤレス 5W</li>
                        <li>iPhoneを無線充電できる</li>
                        <li>ケーブルいらずで嬉しい</li>
                        <li>ぼくのiPhoneにはMagSafeがついてないのでゴムバンドで留めている(え？)</li>
                    </ul>
                </GadgetIntro>

                <h3>落とし物トラッカー</h3>
                <GadgetIntro name="Apple AirTag" imagePath="mobile/airtag.webp">
                    <ul>
                        <li>3つ持ってる</li>
                        <ul>
                            <li>財布用</li>
                            <li>鍵用</li>
                            <li>AirPodsケース用</li>
                        </ul>
                    </ul>
                </GadgetIntro>

                <h3>財布</h3>
                <GadgetIntro name="100円ショップに売ってた布のやつ" imagePath="mobile/wallet.webp">
                    <ul>
                        <li>小銭が取り出しにくい</li>
                        <li>中にAirTagを入れている</li>
                    </ul>
                </GadgetIntro>

                <h3>リュックサック</h3>
                <GadgetIntro name="offtoco" imagePath="mobile/offtoco.webp">
                    <ul>
                        <li>ノパソが直挿しできる</li>
                        <li>紐の調整が簡単</li>
                        <ul>
                            <li>簡単すぎて意図せず紐がグイッと伸びるのが難点</li>
                        </ul>
                        <li>長距離歩いたけどあまり肩が疲れない</li>
                        <li>容量は少なめ</li>
                    </ul>
                </GadgetIntro>

                <GadgetIntro name="無印良品 肩が疲れないリュック" imagePath="mobile/muji.webp">
                    <ul>
                        <li>歩くオタクがおすすめしてたので買った</li>
                        <li>肩が疲れなくて大容量</li>
                    </ul>
                </GadgetIntro>

                <h3>お面</h3>
                <GadgetIntro name="生協の節分の豆についてた鬼のお面" imagePath="mobile/oni.webp">
                    <ul>
                        <li>オタクからもらった(？)</li>
                    </ul>
                </GadgetIntro>
            </Block>
        </Layout>
    )
}

export default Environment