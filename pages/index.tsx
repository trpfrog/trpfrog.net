import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import styles from '../styles/main.module.scss';

const Home: NextPage = () => {
    return (
        <Layout>
            <div id={styles.top_page_grid}>
                <Block id={styles.about_me_grid}>
                    <p>
                        電気通信大学の大学生。東京都(23区ではない方)出身。
                    </p>
                    <p>
                        コンピュータ(レイヤー高め)で遊ぶのが好き。競技プログラミング(C++)をしたり、
                        なんか<a href="https://github.com/TrpFrog">いろいろ</a>作ったりしている。
                    </p>
                    <p>
                        最近では大学のオタクと<a href="https://trpfrog.hateblo.jp">鬼の仮面を被ってお散歩</a>をよくしている。
                    </p>
                </Block>
                <Block title={'移植状況'} h2icon={'robot'} id={styles.sticker}>
                    <ul>
                        <li>サイトの共通部分をだいたい移植した</li>
                        <li>作業環境ページをほぼ100%移植した</li>
                        <ul>
                            <li>おそらく遷移が爆速になっているはずです</li>
                            <li>スマホの人は<Link href="/environment"><a>ここ</a></Link>からアクセスしてください</li>
                        </ul>
                    </ul>
                </Block>
                <Block title={'Todo'} h2icon={'think'} id={styles.icons}>
                    <ul>
                        <li>たくさん</li>
                        <li>まずはトップページの移植？</li>
                        <li>それからハンバーガーメニューの移植</li>
                    </ul>
                </Block>
                <Block title={'音楽ゲーム'} h2icon={'pumpkin'} id={styles.music_game}>
                    <ul className={styles.rating_list}>
                        <li><b>チュウニズム</b><br/>
                            <span className={styles.rainbow} style={{fontSize: '2em'}}>max</span>
                            <span className={styles.rainbow} style={{fontSize: '2.8em'}}>15.03</span>
                        </li>
                        <li><b>オンゲキ</b><br/>
                            <span className={styles.platinum} style={{fontSize: '2em'}}>max</span>
                            <span className={styles.platinum} style={{fontSize: '2.8em'}}>14.84</span>
                        </li>
                        <li><b>SOUND VOLTEX</b><br/>
                            <span className={styles.silver} style={{fontSize: '2.5em'}}>魔騎士</span>
                        </li>
                    </ul>
                    <h2 className="robot">競プロ</h2>
                    <ul className={styles.rating_list}>
                        <li><b>AtCoder</b> (<a href="https://atcoder.jp/users/TrpFrog">TrpFrog</a>) <br/>
                            <span className={styles.water} style={{fontSize: '1.5em'}}>highest</span>
                            <span className={styles.water} style={{fontSize: '2.8em'}}>1572</span>
                        </li>
                        <li><b>Codeforces</b> (<a href="https://codeforces.com/profile/TrpFrog">TrpFrog</a>) <br/>
                            <span className={styles.blue} style={{fontSize: '2em'}}>max</span>
                            <span className={styles.blue} style={{fontSize: '2.8em'}}>1687</span>
                        </li>
                    </ul>
                </Block>
            </div>
        </Layout>
    )
}

export default Home
