'use client'

import { useEffect, useLayoutEffect } from 'react'

import { useReward } from 'react-rewards'
import { useImmer } from 'use-immer'

import { balloonColors, Balloon } from '@/app/balloon/_components/Balloon'

import styles from './index.module.scss'

type BalloonArrayProps = {
  n: number
  width?: number
  onBurst?: (isBurst: boolean[]) => undefined | (() => void)
}

type BalloonColor = (typeof balloonColors)[number]

interface BalloonState {
  isBurst: boolean
  color: BalloonColor
}

const createNewBalloon = (): BalloonState => ({
  isBurst: false,
  color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
})

export function useBalloonState(initialAmount: number, rewardId: string) {
  const [balloons, updateBalloons] = useImmer<BalloonState[]>([])
  const { reward } = useReward(rewardId, 'confetti', {
    zIndex: 1000,
    elementCount: 500,
    startVelocity: 30,
    spread: 160,
    decay: 0.965,
    elementSize: 12,
    lifetime: 600,
  })

  useEffect(() => {
    updateBalloons(draft => {
      for (let i = draft.length; i < initialAmount; i++) {
        draft.push(createNewBalloon())
      }
    })
  }, [initialAmount, updateBalloons])

  return {
    balloons,
    updateAmount: (newAmount: number) => {
      if (newAmount === balloons.length) return
      updateBalloons(draft => {
        while (draft.length < newAmount) {
          draft.push(createNewBalloon())
        }
        while (draft.length > newAmount) {
          draft.pop()
        }
      })
    },
    burst: (idx: number) => {
      updateBalloons(draft => {
        draft[idx].isBurst = true
      })
      const isAllBalloonBurst = balloons.slice(0, balloons.length).every(balloon => balloon.isBurst)
      if (isAllBalloonBurst) {
        reward()
      }
    },
  }
}

// TODO: useBalloonState を外に逃す (useEffect で毎度 setter を呼ぶのはアンチパターン)
export function BalloonArray({ n, width = 80, onBurst: userOnBurst }: BalloonArrayProps) {
  const height = width / 0.6

  const { updateAmount, balloons, burst } = useBalloonState(n, styles.reward_start_point)
  useLayoutEffect(() => {
    const currentAmount = balloons.length
    updateAmount(n)
    return () => {
      updateAmount(currentAmount)
    }
  }, [balloons.length, n, updateAmount])

  const isBurstArray = balloons.map(balloon => balloon.isBurst)
  useEffect(() => {
    const cleanup = userOnBurst?.(isBurstArray)
    return () => {
      cleanup?.()
    }
  }, [isBurstArray, userOnBurst])

  return (
    <>
      <div id={styles.balloon_grid}>
        {balloons.map((balloon, idx) => (
          <Balloon
            className={styles.balloon}
            key={idx}
            width={`${width}px`}
            height={`${height}px`}
            isBurst={balloon.isBurst}
            color={balloon.color}
            onBurst={() => burst(idx)}
          />
        ))}
      </div>
      <div id={styles.reward_start_point} />
    </>
  )
}
