'use client'

import { useRef } from 'react'

import { Button } from '@ui-sdk/react/button'
import { toast } from '@ui-sdk/react/toast'

import { createURL } from '@trpfrog.net/utils'

import { useIconMakerController, useIconMakerRef } from '@/app/icon-maker/iconMakerHooks'
import { ImagePicker } from '@/components/atoms/FormControls'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { twJoin } from '@/lib/tailwind'

import styles from './style.module.css'

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
        <ImagePicker
          onPick={async file => {
            try {
              await state.current?.upload(file)
            } catch (error) {
              toast.error('画像の読み込みに失敗しました')
              console.error('Failed to upload image for icon maker.', error)
            } finally {
              window.location.hash = 'preview'
            }
          }}
        >
          画像を選択
        </ImagePicker>
      </Block>

      <Block title={'プレビュー'}>
        <p>位置を調整していい感じのところで描画を押してください。</p>
        <div>
          <div className="content">
            <canvas
              ref={canvasRef}
              className="tw:rounded-md tw:bg-trpfrog-50"
              style={{ width: '100%', maxWidth: '500px' }}
            />
          </div>
        </div>
        <div>
          <div className={styles.ctrl_btn_grid}>
            {controlButtons.map(btn => (
              <Button
                key={btn.text}
                className={twJoin(styles.ctrl_btn, btn.className)}
                onClick={btn.onClick}
              >
                {btn.text}
              </Button>
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
            alt="初期画像"
            width={500}
            height={500}
          />
        </p>
        <p>
          <RichButton href={tweetLink}>Tweet</RichButton>
        </p>
        <p>
          (画像付きツイートで共有するのが無理だったので、一旦画像を保存してからこのボタンで共有して欲しいです〜(ごめんね))
        </p>
      </Block>
    </>
  )
}
