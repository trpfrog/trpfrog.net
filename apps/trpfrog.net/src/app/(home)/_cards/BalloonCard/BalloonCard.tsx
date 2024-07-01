'use client'

import React, { useRef } from 'react'

import { TopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

import { useResizableBalloonArray } from './useResizableBalloonArray'

const createStyles = tv({
  slots: {
    wrapper: 'tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center sp:tw-h-32',
    dialog: [
      'tw-absolute tw-left-0 tw-top-0 tw-z-10 tw-h-full tw-w-full',
      'tw-flex tw-flex-col tw-items-center tw-justify-center',
      'tw-gap-1 tw-font-bold tw-backdrop-blur-sm',
    ],
    button: cardButtonStyle({ invertColor: true }),
  },
  variants: {
    isBurstAll: {
      true: {
        dialog: 'tw-opacity-100 tw-delay-500 tw-duration-700',
      },
      false: {
        dialog: 'tw-pointer-events-none tw-opacity-0 tw-duration-100',
      },
    },
  },
})

export function BalloonCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { balloonComponent, isBurstAll } = useResizableBalloonArray(cardRef, 60)
  const styles = createStyles({ isBurstAll })

  return (
    <TopCard>
      <div className={styles.wrapper()} ref={cardRef}>
        {balloonComponent}
      </div>
      <div className={styles.dialog()}>
        <span>Want more balloons popping?</span>
        <A href="/balloon" className={styles.button()}>
          もっと割る
        </A>
      </div>
    </TopCard>
  )
}
