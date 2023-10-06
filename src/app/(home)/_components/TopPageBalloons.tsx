'use client'

import styles from '@/app/(home)/page.module.scss'
import Balloon from '@/app/balloon/_components/Balloon'
import { useBalloonState } from '@/app/balloon/_components/BalloonArray'

import { Button } from '@/components/atoms/Button'
import { Block } from '@/components/molecules/Block'

type Props = {
  id?: string
}

export const TopPageBalloons = ({ id }: Props) => {
  const balloonAmount = 7
  const { isBurst, balloonColorArray, onBurst } = useBalloonState(
    balloonAmount,
    id ?? '',
  )

  return (
    <Block
      title={'風船コーナー'}
      h2icon={'ice'}
      id={id}
      style={{ overflow: 'hidden' }}
    >
      <div id={styles.top_balloon_grid}>
        {Array.from(Array(7), (v, k) => (
          <Balloon
            key={k}
            width={'100%'}
            height={'100%'}
            isBurst={isBurst[k]}
            color={balloonColorArray[k]}
            onBurst={() =>
              onBurst({
                index: k,
                currentAmount: balloonAmount,
              })
            }
          />
        ))}
      </div>
      <p>
        <Button href={'/balloon'}>もっと割る</Button>
      </p>
    </Block>
  )
}
