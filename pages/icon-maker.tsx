import type {NextPage} from 'next'
import Image from "next/legacy/image";
import Link from 'next/link'
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

import IconCanvas from '../lib/iconMaker';
import styles from '../styles/icon-maker.module.scss';

const About: NextPage = () => {
  const state = new IconCanvas('canvas-result');
  const tweetLink =
        'https://twitter.com/intent/tweet' +
        '?text=' + encodeURIComponent('#つまみアイコンメーカー でアイコンを作成しました！') +
        '&url=' + encodeURIComponent('https://trpfrog.net/iconmaker/');

  return (
    <Layout>
      <Title
        title={'アイコンメーカー.ts'}
        ribbonText={'BETA'}
        description={'TypeScriptで書き直したアイコンメーカーです。'}
        cardImageUrl={'/images/icon_maker/TwitterCardIconmaker.png'}
      >
        <p>
                    画像をアップロードしてつまみアイコンを作ろう！<br/>
                    作成したアイコンはSNS等のアイコンに使うことができます。
        </p>
      </Title>

      <Block title={'画像の選択'}>
        <input type="file" onChange={(e) => {
          state.upload(e.target.files);
          window.location.hash = "preview";
        }}/>
      </Block>

      <Block title={'プレビュー'}>
        <p>
                    位置を調整していい感じのところで描画を押してください。
        </p>
        <p>
          <b>既知のバグ:</b> ボタン操作をしないとつまみフレームが現れない
        </p>
        <p>
          <div className="content">
            <canvas className="rich_image" id="canvas-result" style={{width: '100%', maxWidth: '500px'}}/>
          </div>
        </p>
        <p>
          <div className={styles.ctrl_btn_grid}>
            <button
              type="button"
              className={styles.plus_btn}
              onClick={() => state.scaleImage(1.05)}>+</button>
            <button
              type="button"
              className={styles.minus_btn}
              onClick={() => state.scaleImage(1/1.05)}>-</button>
            <button
              type="button"
              className={styles.left_btn}
              onClick={() => state.moveImage(-5,0)}>←</button>
            <button
              type="button"
              className={styles.down_btn}
              onClick={() => state.moveImage(0,5)}>↓</button>
            <button
              type="button"
              className={styles.up_btn}
              onClick={() => state.moveImage(0,-5)}>↑</button>
            <button
              type="button"
              className={styles.right_btn}
              onClick={() => state.moveImage(5,0)}>→</button>
            <button
              type="button"
              className={styles.rotate_left_btn}
              onClick={() => state.rotateImage(5)}>←R</button>
            <button
              type="button"
              className={styles.rotate_right_btn}
              onClick={() => state.rotateImage(5)}>R→</button>
            <button
              type="button"
              className={styles.apply_btn}
              onClick={() => state.writeImage()}>描画</button>
          </div>
        </p>

      </Block>

      <Block title={'生成した画像'}>
        <p>
                    PCの方は右クリック、スマートフォンの方は長押しで保存できます。
        </p>
        <p>
          <Image
            src={'/icons_gallery/28'}
            width={500}
            height={500}
            layout={"intrinsic"}
          />
        </p>
        <p>
          <a href={tweetLink} className="linkButton">Tweet</a>
        </p>
        <p>
                    (画像付きツイートで共有するのが無理だったので、一旦画像を保存してからこのボタンで共有して欲しいです〜(ごめんね))
        </p>

      </Block>

      <Block title={'ご利用条件・免責事項'}>
        <p>
                    当サービスは第三者の権利を侵害したり、 公序良俗や法律に反するような用途にはご利用いただけません。
                    また、当サービスを使用したことにより発生したいかなる損害に対しても、 当サイトは一切の責任を負いません。
        </p>
        <p>
                    詳しくは<Link href={'/legal'}>こちら</Link>をご覧ください。
        </p>
      </Block>
    </Layout>
  );
}

export default About

