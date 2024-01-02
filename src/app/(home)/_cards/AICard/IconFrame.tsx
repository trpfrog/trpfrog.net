'use client'

import { WaveText } from '@/components/atoms/WaveText'

import { tv } from '@/lib/tailwind/variants'
import { ParseWithBudouX } from '@/lib/wordSplit'

import {
  TrpFrogDiffusionResult,
  useTrpFrogDiffusion,
} from './useTrpFrogDiffusion'

const createStyles = tv({
  slots: {
    picture: [
      'tw-aspect-square tw-w-full',
      'tw-font-mplus-rounded tw-text-2xl tw-font-bold',
      'tw-flex tw-items-center tw-justify-center',
    ],
    caption: [
      'tw-flex tw-flex-col tw-items-center tw-justify-center',
      'tw-my-3 tw-gap-2 tw-text-center',
    ],
    english:
      'tw-text-balance tw-text-lg tw-font-black tw-italic tw-leading-tight',
    japanese: 'tw-text-balance tw-text-xs',
  },
  variants: {
    status: {
      ok: {
        english: `
          tw-bg-gradient-to-br 
          tw-from-blue-400 tw-to-pink-400 
          tw-bg-clip-text tw-text-transparent
        `,
      },
      loading: {
        picture: 'tw-bg-gray-200 tw-text-black',
        english: 'tw-h-4 tw-w-2/3 tw-animate-pulse tw-rounded tw-bg-zinc-400',
        japanese: 'tw-h-3 tw-w-1/3 tw-animate-pulse tw-rounded tw-bg-zinc-400',
      },
      error: {
        picture: 'tw-bg-red-800 tw-text-white',
      },
    } satisfies Record<TrpFrogDiffusionResult['status'], unknown>,
  },
  defaultVariants: {
    status: 'ok',
  },
})

export function IconFrame() {
  const { status, data } = useTrpFrogDiffusion()

  if (status === 'loading') {
    const styles = createStyles({ status })
    return (
      <figure>
        <div className={styles.picture()}>
          <WaveText>Loading...</WaveText>
        </div>
        <figcaption className={styles.caption()}>
          <div className={styles.english()} />
          <div className={styles.japanese()} />
        </figcaption>
      </figure>
    )
  }

  if (status === 'error') {
    const styles = createStyles({ status })
    return (
      <figure>
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
      </figure>
    )
  }

  const styles = createStyles()
  const { base64, prompt, translated } = data
  return (
    <figure>
      <img
        className={styles.picture()}
        src={`data:image/png;base64,${base64}`}
        alt={`Auto generated image by AI: ${prompt}`}
      />
      <figcaption className={styles.caption()}>
        <div className={styles.english()}>{prompt}</div>
        <div className={styles.japanese()}>
          <ParseWithBudouX str={translated} slug={'trpfrog-diffusion'} />
        </div>
      </figcaption>
    </figure>
  )
}
