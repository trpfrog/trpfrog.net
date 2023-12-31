'use client'

import { useRef } from 'react'

import {
  useIconMakerController,
  useIconMakerRef,
} from '@/app/icon-maker/iconMakerHooks'

import { MagicButton } from '@/components/atoms/Button'
import { Block } from '@/components/molecules/Block'
import { Input } from '@/components/wrappers'

import { createURL } from '@/lib/url'

import styles from './style.module.scss'

export function IconMakerApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useIconMakerRef(canvasRef)
  const controlButtons = useIconMakerController(state)

  const tweetLink = createURL('/intent/tweet', 'https://twitter.com', {
    text: '#つまみアイコンメーカー でアイコンを作成しました！',
    url: 'https://trpfrog.net/iconmaker/',
  })

  return (
    <>
      <Block title={'画像の選択'}>
        <Input
          type="file"
          onChange={e => {
            state.current?.upload(e.target.files)
            window.location.hash = 'preview'
          }}
        />
      </Block>

      <Block title={'プレビュー'}>
        <p>位置を調整していい感じのところで描画を押してください。</p>
        <div>
          <div className="content">
            <canvas
              ref={canvasRef}
              className="tw-rounded-md tw-bg-trpfrog-50"
              style={{ width: '100%', maxWidth: '500px' }}
            />
          </div>
        </div>
        <div>
          <div className={styles.ctrl_btn_grid}>
            {controlButtons.map((btn, i) => (
              <button key={i} className={btn.className} onClick={btn.onClick}>
                {btn.text}
              </button>
            ))}
          </div>
        </div>
      </Block>

      <Block title={'生成した画像'}>
        <p>PCの方は右クリック、スマートフォンの方は長押しで保存できます。</p>
        <p>
          <img
            id="result-image"
            src="https://res.cloudinary.com/trpfrog/icons_gallery/28"
            alt="default image"
            width={500}
            height={500}
          />
        </p>
        <p>
          <MagicButton externalLink={true} href={tweetLink}>
            Tweet
          </MagicButton>
        </p>
        <p>
          (画像付きツイートで共有するのが無理だったので、一旦画像を保存してからこのボタンで共有して欲しいです〜(ごめんね))
        </p>
      </Block>
    </>
  )
}
