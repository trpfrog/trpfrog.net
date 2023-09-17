'use client'
import React from 'react'

import Balancer from 'react-wrap-balancer'
import useSWR, { Fetcher } from 'swr'

import styles from '@/app/(home)/_components/TrpFrogIconFrame/index.module.scss'
import type { TrpFrogImageGenerationResult } from '@/app/api/trpfrog-diffusion/route'

import WaveText from '@/components/atoms/WaveText'

import { ParseWithBudouX } from '@/lib/wordSplit'

export function IconFrame() {
  const fetcher: Fetcher<TrpFrogImageGenerationResult, string> = url =>
    fetch(url).then(r => r.json())

  const { data, error, isLoading } = useSWR('/api/trpfrog-diffusion', fetcher)

  if (isLoading) {
    return (
      <figure style={{ margin: '20px 0' }}>
        <div className={styles.loading_picture}>
          <WaveText>Loading...</WaveText>
        </div>
        <figcaption className={styles.caption_wrapper}>
          <div className={`${styles.caption_en} ${styles.waiting}`} />
          <div className={`${styles.caption_ja} ${styles.waiting}`} />
        </figcaption>
      </figure>
    )
  }

  if (error || !data || !data.base64) {
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

  const { base64, prompt, translated } = data
  return (
    <figure style={{ margin: '20px 0' }}>
      <img
        className={styles.picture}
        src={`data:image/png;base64,${base64}`}
        alt={`Auto generated image by AI: ${prompt}`}
      />
      <figcaption className={styles.caption_wrapper}>
        <div className={styles.caption_en}>
          <Balancer>{prompt}</Balancer>
        </div>
        <div className={styles.caption_ja}>
          <Balancer>
            <ParseWithBudouX str={translated} slug={'trpfrog-diffusion'} />
          </Balancer>
        </div>
      </figcaption>
    </figure>
  )
}
