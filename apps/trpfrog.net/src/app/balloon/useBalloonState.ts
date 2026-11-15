import type { RefObject } from 'react'

import { confetti, useReward } from 'react-rewards'
import { ArrayValues } from 'type-fest'
import { useImmer } from 'use-immer'

import { balloonColors } from '@/app/balloon/_components/Balloon/constants'

import { BALLOON_AMOUNT, type Range, toIntegerWithin } from './limits'

type BalloonColor = ArrayValues<typeof balloonColors>

interface BalloonState {
  isBurst: boolean
  color: BalloonColor | 'random'
}

/**
 * 風船の並びを持つ。風船の数は初期値も updateAmount も amountRange 内の整数に直し、
 * 数でない値は受け付けない
 */
export function useBalloonState(
  initialAmount: number,
  options: {
    rewardRef: RefObject<HTMLDivElement | null>
    onBurst?: (isBurst: boolean[]) => void
    /** 風船の数として受け付ける範囲。BALLOON_AMOUNT より狭くするときに渡す */
    amountRange?: Range
  },
) {
  const amountRange = options.amountRange ?? BALLOON_AMOUNT
  const [balloons, updateBalloons] = useImmer<BalloonState[]>(() => {
    const balloons: BalloonState[] = []
    const amount = toIntegerWithin(initialAmount, amountRange) ?? amountRange.min
    for (let i = 0; i < amount; i++) {
      balloons.push({
        isBurst: false,
        color: 'random',
      })
    }
    return balloons
  })
  const { reward } = useReward(
    options.rewardRef,
    confetti,
    {
      count: 500,
      velocity: 1800,
      spread: 160,
      drag: 2.1,
      size: 12,
      lifetime: 10000,
    },
    { zIndex: 1000 },
  )

  return {
    balloons,
    updateAmount: (requestedAmount: number) => {
      const newAmount = toIntegerWithin(requestedAmount, amountRange)
      if (newAmount === null || newAmount === balloons.length) return
      updateBalloons(draft => {
        while (draft.length < newAmount) {
          draft.push({
            isBurst: false,
            color: 'random',
          })
        }
        while (draft.length > newAmount) {
          draft.pop()
        }
      })
    },
    burst: (idx: number) => {
      updateBalloons(draft => {
        draft[idx].isBurst = true
        options.onBurst?.(draft.map(balloon => balloon.isBurst))
        const isAllBalloonBurst = draft.every(balloon => balloon.isBurst)
        if (isAllBalloonBurst) {
          reward()
        }
      })
    },
  }
}
