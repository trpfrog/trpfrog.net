'use client'

import { Balloon } from '@/app/balloon/_components/Balloon'
import { useBalloonState } from '@/app/balloon/useBalloonState.ts'

import styles from './index.module.scss'

type BalloonArrayProps = {
  states: ReturnType<typeof useBalloonState>
  width: number
}

export function BalloonArray(props: BalloonArrayProps) {
  const height = props.width / 0.6
  return (
    <div id={styles.balloon_grid}>
      {props.states.balloons.map((balloon, idx) => (
        <Balloon
          className={styles.balloon}
          key={idx}
          width={`${props.width}px`}
          height={`${height}px`}
          isBurst={balloon.isBurst}
          color={balloon.color}
          onBurst={() => props.states.burst(idx)}
        />
      ))}
    </div>
  )
}
