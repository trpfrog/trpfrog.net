'use client';

import Block from "@/components/Block";
import styles from "./style.module.scss";
import Image from "next/legacy/image";
import IconCanvas from "@/lib/iconMaker";

export default function IconMakerApp () {
  const state = new IconCanvas('canvas-result');
  const tweetLink = (
    'https://twitter.com/intent/tweet' +
    '?text=' + encodeURIComponent('#つまみアイコンメーカー でアイコンを作成しました！') +
    '&url=' + encodeURIComponent('https://trpfrog.net/iconmaker/')
  )

  const controlButtons = [
    {
      className: styles.plus_btn,
      onClick: () => state.scaleImage(1.05),
      text: '+'
    },
    {
      className: styles.minus_btn,
      onClick: () => state.scaleImage(1 / 1.05),
      text: '-'
    },
    {
      className: styles.left_btn,
      onClick: () => state.moveImage(-5, 0),
      text: '←'
    },
    {
      className: styles.down_btn,
      onClick: () => state.moveImage(0, 5),
      text: '↓'
    },
    {
      className: styles.up_btn,
      onClick: () => state.moveImage(0, -5),
      text: '↑'
    },
    {
      className: styles.right_btn,
      onClick: () => state.moveImage(0, 5),
      text: '→'
    },
    {
      className: styles.rotate_left_btn,
      onClick: () => state.rotateImage(5),
      text: '←R'
    },
    {
      className: styles.rotate_right_btn,
      onClick: () => state.rotateImage(5),
      text: 'R→'
    },
    {
      className: styles.apply_btn,
      onClick: () => state.writeImage(),
      text: '描画'
    }
  ] satisfies {
    className: string;
    onClick: () => void;
    text: string;
  }[];

  return (
    <>
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
        <div>
          <div className="content">
            <canvas className="rich_image" id="canvas-result" style={{width: '100%', maxWidth: '500px'}}/>
          </div>
        </div>
        <div>
          <div className={styles.ctrl_btn_grid}>
            {controlButtons.map((btn, i) => (
              <button
                key={i}
                className={btn.className}
                onClick={btn.onClick}
              >
                {btn.text}
              </button>
            ))}
          </div>
        </div>

      </Block>

      <Block title={'生成した画像'}>
        <p>
          PCの方は右クリック、スマートフォンの方は長押しで保存できます。
        </p>
        <p>
          <Image
            src={'/icons_gallery/28'}
            alt={'default image'}
            width={500}
            height={500}
            layout={"intrinsic"}
          />
        </p>
        <p>
          <a href={tweetLink} className="linkButton">
            Tweet
          </a>
        </p>
        <p>
          (画像付きツイートで共有するのが無理だったので、一旦画像を保存してからこのボタンで共有して欲しいです〜(ごめんね))
        </p>

      </Block>
    </>
  );
}
