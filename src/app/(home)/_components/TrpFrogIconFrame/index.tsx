import React, { Suspense } from 'react'

import WaveText from '@/components/atoms/WaveText'
import Block from '@/components/molecules/Block'

import { generateRandomPrompt, generateTrpFrogImage } from '@/lib/randomTrpFrog'

import styles from './index.module.scss'

const AIIconFrame = React.memo(async function AIIconFrame(props: {
  imageBase64: string
  alt: string
  size?: number | string
}) {
  return (
    <img
      style={{ width: props.size }}
      className={styles.picture}
      src={`data:image/png;base64,${props.imageBase64}`}
      alt={`Auto generated image by AI: ${props.alt}`}
    />
  )
})

function DiffusionWaitingFallBack() {
  return (
    <figure style={{ margin: '20px 0' }}>
      <div className={styles.loading_picture}>
        <WaveText>Generating...</WaveText>
      </div>
      <figcaption className={styles.caption_wrapper}>
        <div className={`${styles.caption_en} ${styles.waiting}`} />
        <div className={`${styles.caption_ja} ${styles.waiting}`} />
      </figcaption>
    </figure>
  )
}

function DiffusionErrorFallback() {
  return (
    <figure style={{ margin: '20px 0' }}>
      <div className={styles.error_picture}>
        <span>Error occurred</span>
      </div>
      <figcaption className={styles.caption_wrapper}>
        <p>
          エラーが発生しました。
          <br />
          時間をあけて再度お試しください。
        </p>
      </figcaption>
    </figure>
  )
}

async function IconFrame() {
  if (process.env.NODE_ENV === 'development') {
    return <DiffusionWaitingFallBack />
  }

  let base64 = ''
  let prompt = ''
  let translated = ''
  const numberOfRetries = 3
  for (const _ of Array(numberOfRetries)) {
    try {
      const promptRes = await generateRandomPrompt()
      prompt = promptRes.prompt
      translated = promptRes.translated
      const result = await generateTrpFrogImage(prompt)
      if (!result.success) {
        continue
      }
      base64 = result.base64
    } catch (e) {
      console.error(e)
      continue
    }
    break
  }

  if (!base64) {
    return <DiffusionErrorFallback />
  }

  return (
    <figure style={{ margin: '20px 0' }}>
      <AIIconFrame imageBase64={base64} alt={prompt} />
      <figcaption className={styles.caption_wrapper}>
        <div className={styles.caption_en}>{prompt}</div>
        <div className={styles.caption_ja}>{translated}</div>
      </figcaption>
    </figure>
  )
}

export default function TrpFrogIconFrame() {
  return (
    <Block title={'TrpFrog Diffusion'} h2icon={'robot'}>
      <Suspense fallback={<DiffusionWaitingFallBack />}>
        <IconFrame />
      </Suspense>

      <hr />
      <small style={{ fontSize: '0.6em' }}>
        <div>この画像は一定時間ごとに自動生成されます。</div>
        <div>
          Powered by{' '}
          <a href={'https://huggingface.co/Prgckwb/trpfrog-diffusion'}>
            Prgckwb/trpfrog-diffusion
          </a>
        </div>
      </small>
    </Block>
  )
}
