import type { RefObject } from 'react'

import { confetti, useReward } from 'react-rewards'
import { ArrayValues } from 'type-fest'
import { useImmer } from 'use-immer'

import { balloonColors } from '@/app/balloon/_components/Balloon/constants'

type BalloonColor = ArrayValues<typeof balloonColors>

interface BalloonState {
  isBurst: boolean
  color: BalloonColor | 'random'
}

export function useBalloonState(
  initialAmount: number,
  options: {
    rewardRef: RefObject<HTMLDivElement | null>
    onBurst?: (isBurst: boolean[]) => void
  },
) {
  const [balloons, updateBalloons] = useImmer<BalloonState[]>(() => {
    const balloons: BalloonState[] = []
    for (let i = 0; i < initialAmount; i++) {
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
    updateAmount: (newAmount: number) => {
      if (newAmount === balloons.length) return
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
