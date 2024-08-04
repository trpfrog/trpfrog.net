'use client'

import * as React from 'react'
import { useCallback, useEffect } from 'react'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import useSWR from 'swr'

import { NODE_ENV } from '@/env/client'

import { bffClient } from '@/app/api/client'

import { InlineLink } from '@/components/atoms/InlineLink'
import { WaveText } from '@/components/atoms/WaveText'

import { tv } from '@/lib/tailwind/variants'
import { ParseWithBudouX } from '@/lib/wordSplit'

const createStyles = tv({
  slots: {
    wrapper: 'tw-@container',
    layout: 'tw-flex tw-h-full tw-flex-col @sm:tw-flex-row',
    picture: [
      'tw-aspect-square tw-w-full @sm:tw-w-1/3 @sm:tw-scale-105',
      'tw-font-mplus-rounded tw-text-2xl tw-font-bold',
      'tw-flex tw-items-center tw-justify-center',
    ],
    caption: [
      'tw-flex-1 tw-gap-1 tw-px-2 tw-text-center',
      'tw-flex tw-flex-col tw-items-center tw-justify-center',
    ],
    english: 'tw-text-balance tw-text-lg tw-font-black tw-italic tw-leading-tight',
    japanese: 'tw-text-balance tw-text-[11px]',
    aiGeneratedMsg: 'tw-text-[9px] tw-leading-none tw-text-gray-500',
    poweredBy: 'tw-text-center tw-text-[10px] tw-leading-none tw-text-gray-500',
  },
  variants: {
    status: {
      ok: {
        english: `tw-bg-gradient-to-br tw-from-blue-400 tw-to-pink-400 tw-bg-clip-text tw-text-transparent`,
      },
      loading: {
        picture: 'tw-bg-gray-200 tw-text-black',
        english: 'tw-h-4 tw-w-2/3 tw-animate-pulse tw-rounded tw-bg-zinc-400',
        japanese: 'tw-h-3 tw-w-1/3 tw-animate-pulse tw-rounded tw-bg-zinc-400',
      },
      error: {
        picture: 'tw-bg-red-800 tw-text-white',
      },
    },
  },
  defaultVariants: {
    status: 'ok',
  },
})

const imgGenClient = createTrpFrogImageGenerationClient(NODE_ENV)

export function IconFrame() {
  const fetcher = useCallback(
    () => imgGenClient.current.metadata.$get().then(res => res.json()),
    [],
  )
  const { isLoading, data, error } = useSWR('/', fetcher)

  // Trigger update request on mount
  useEffect(() => {
    void bffClient.diffusion.update.$post()
  }, [])

  if (isLoading) {
    const styles = createStyles({ status: 'loading' })
    return (
      <figure className={styles.wrapper()}>
        <div className={styles.layout()}>
          <div className={styles.picture()}>
            <WaveText>Loading...</WaveText>
          </div>
          <figcaption className={styles.caption()}>
            <div className={styles.english()} />
            <div className={styles.japanese()} />
          </figcaption>
        </div>
      </figure>
    )
  }

  if (error || !data) {
    const styles = createStyles({ status: 'error' })
    return (
      <figure className={styles.wrapper()}>
        <div className={styles.layout()}>
          <div className={styles.picture()}>
            <span>Error occurred</span>
          </div>
          <figcaption className={styles.caption()}>
            <p>
              エラーが発生しました。
              <br />
              時間をあけて再度お試しください。
            </p>
          </figcaption>
        </div>
      </figure>
    )
  }

  const styles = createStyles()
  const imageSrcUrl = imgGenClient.current.$url().toString()
  return (
    <figure className={styles.wrapper()}>
      <div className={styles.layout()}>
        <img
          className={styles.picture()}
          src={imageSrcUrl}
          alt={`Auto generated image by AI: ${data.prompt}`}
        />
        <figcaption className={styles.caption()}>
          <div className={styles.aiGeneratedMsg()}>AI GENERATED ICON</div>
          <div className={styles.english()}>{data.prompt}</div>
          <div className={styles.japanese()}>
            <ParseWithBudouX str={data.translated} slug={'trpfrog-diffusion'} />
          </div>
          <div className={styles.poweredBy()}>
            Powered by{' '}
            <InlineLink href={'https://huggingface.co/Prgckwb/trpfrog-diffusion'}>
              Prgckwb/trpfrog-diffusion
            </InlineLink>
          </div>
        </figcaption>
      </div>
    </figure>
  )
}
