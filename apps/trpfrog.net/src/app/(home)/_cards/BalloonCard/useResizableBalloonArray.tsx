import React, { useEffect, useId, useState } from 'react'

import { BalloonArray } from '@/app/balloon/_components/BalloonArray'
import { useBalloonState } from '@/app/balloon/useBalloonState.ts'

export function useResizableBalloonArray(
  cardRef: React.RefObject<HTMLDivElement | null>,
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

  const rewardStartPositionId = useId()
  const balloonState = useBalloonState(5, {
    rewardId: rewardStartPositionId,
  })

  return {
    balloonComponent: (
      <>
        <BalloonArray
          states={balloonState}
          width={balloonWidth}
          key={balloonAmount} // 風船の数が変わったら state をリセット
        />
        <div id={rewardStartPositionId} className="tw-fixed tw-top-0 tw-left-1/2" />
      </>
    ),
    isBurstAll: balloonState.balloons.every(balloon => balloon.isBurst),
  }
}
