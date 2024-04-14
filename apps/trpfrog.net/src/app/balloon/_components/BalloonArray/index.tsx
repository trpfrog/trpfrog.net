'use client'

import { useEffect, useState } from 'react'

import { useReward } from 'react-rewards'

import { balloonColors, Balloon } from '@/app/balloon/_components/Balloon'

import styles from './index.module.scss'

type BalloonArrayProps = {
  n: number
  width?: number
  onBurst?: (isBurst: boolean[]) => void
}

type BalloonColor = (typeof balloonColors)[number]

export function useBalloonState(initialAmount: number, rewardId: string) {
  const createRandomColorArray = (n: number) => {
    return Array.from(
      Array(n),
      () => balloonColors[Math.floor(Math.random() * 3)],
    )
  }

  const { reward } = useReward(rewardId, 'confetti', {
    zIndex: 1000,
    elementCount: 500,
    startVelocity: 30,
    spread: 160,
    decay: 0.965,
    elementSize: 12,
    lifetime: 600,
  })

  const [isBurstArray, setIsBurstArray] = useState<boolean[]>(
    Array(initialAmount).fill(false),
  )

  const [balloonColorArray, setBalloonColorArray] = useState<BalloonColor[]>([])
  useEffect(() => {
    setBalloonColorArray(createRandomColorArray(initialAmount))
  }, [initialAmount])

  return {
    isBurst: isBurstArray,
    setBurst: setIsBurstArray,
    balloonColorArray,
    setBalloonColorArray,

    updateAmount: (newAmount: number) => {
      if (newAmount > isBurstArray.length) {
        isBurstArray.push(...Array(newAmount - isBurstArray.length).fill(false))
        balloonColorArray.push(
          ...createRandomColorArray(newAmount - balloonColorArray.length),
        )
        setIsBurstArray([...isBurstArray])
        setBalloonColorArray([...balloonColorArray])
      }
    },

    onBurst: (onBurstProps: { index: number; currentAmount: number }) => {
      isBurstArray[onBurstProps.index] = true
      setIsBurstArray([...isBurstArray])
      const isAllBalloonBurst = isBurstArray
        .slice(0, onBurstProps.currentAmount)
        .every(Boolean)
      if (isAllBalloonBurst) {
        reward()
      }
    },
  }
}

export function BalloonArray({
  n,
  width = 80,
  onBurst: userOnBurst,
}: BalloonArrayProps) {
  const height = width / 0.6

  const { updateAmount, isBurst, balloonColorArray, onBurst } = useBalloonState(
    n,
    styles.reward_start_point,
  )
  updateAmount(n)

  useEffect(() => {
    userOnBurst?.(isBurst)
  }, [isBurst, userOnBurst])

  return (
    <>
      <div id={styles.balloon_grid}>
        {Array.from(Array(n), (v, k) => (
          <Balloon
            className={styles.balloon}
            key={k}
            width={`${width}px`}
            height={`${height}px`}
            isBurst={isBurst[k]}
            color={balloonColorArray[k]}
            onBurst={() =>
              onBurst({
                index: k,
                currentAmount: n,
              })
            }
          />
        ))}
      </div>
      <div id={styles.reward_start_point} />
    </>
  )
}
