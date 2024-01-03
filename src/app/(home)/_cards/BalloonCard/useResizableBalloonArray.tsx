import React, { useEffect, useMemo, useState, useTransition } from 'react'

import { BalloonArray } from '@/app/balloon/_components/BalloonArray'

export function useResizableBalloonArray(
  cardRef: React.RefObject<HTMLDivElement>,
  balloonWidth: number,
) {
  const [balloonAmount, setBalloonAmount] = useState(0)
  const balloonHeight = balloonWidth / 0.6

  useEffect(() => {
    // リサイズ時、動的に風船の数を変更
    const observer = new ResizeObserver(() => {
      if (!cardRef.current) return

      // TODO: EPS なしでもレイアウトが崩れないようにする
      const EPS = 10
      const cardWidth = cardRef.current.clientWidth - EPS
      const cardHeight = cardRef.current.clientHeight - EPS

      const horizontalBalloonAmount = Math.floor(cardWidth / balloonWidth)
      const verticalBalloonAmount = Math.floor(cardHeight / balloonHeight)
      const balloonAmount = horizontalBalloonAmount * verticalBalloonAmount
      setBalloonAmount(balloonAmount)
    })

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    return () => observer.disconnect()
  }, [balloonHeight, balloonWidth, cardRef])

  // 全ての風船が割れたかどうか
  const [isBurstAll, setIsBurstAll] = useState(false)
  const [_, startTransition] = useTransition()

  return useMemo(
    () => ({
      balloonComponent: (
        <BalloonArray
          n={balloonAmount}
          width={balloonWidth}
          onBurst={isBurst =>
            // 割れてすぐに画面に反映させる必要はないので遅延させる
            startTransition(() => setIsBurstAll(isBurst.every(v => v)))
          }
          key={balloonAmount} // 風船の数が変わったら state をリセット
        />
      ),
      isBurstAll,
    }),
    [balloonAmount, isBurstAll, balloonWidth],
  )
}
