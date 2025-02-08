import { useReward } from 'react-rewards'
import { useImmer } from 'use-immer'

import { balloonColors } from '@/app/balloon/_components/Balloon'

type BalloonColor = (typeof balloonColors)[number]

interface BalloonState {
  isBurst: boolean
  color: BalloonColor | 'random'
}

export function useBalloonState(
  initialAmount: number,
  options?: {
    rewardId?: string
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
  const { reward } = useReward(options?.rewardId ?? '__reward_id', 'confetti', {
    zIndex: 1000,
    elementCount: 500,
    startVelocity: 30,
    spread: 160,
    decay: 0.965,
    elementSize: 12,
    lifetime: 600,
  })

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
        options?.onBurst?.(draft.map(balloon => balloon.isBurst))
        const isAllBalloonBurst = draft.every(balloon => balloon.isBurst)
        if (isAllBalloonBurst) {
          reward()
        }
      })
    },
  }
}
