'use client'

import { useState } from 'react'

import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { Input } from '@/components/wrappers'

import { clamp } from '@/lib/utils'

import { MagicButton } from 'src/components/atoms/MagicButton'

import { useBalloonSound } from './_components/Balloon'
import { BalloonArray } from './_components/BalloonArray'

export function BalloonApp() {
  const [isSoundEnabled, setSoundEnabled] = useBalloonSound()

  const getValidInteger = (s: string) => {
    let n = parseInt(s, 10)
    if (isNaN(n)) return 1
    return clamp(n, 1, 10000)
  }

  const [numberOfBalloons, setNumberOfBalloons] = useState(96)

  const changeAmount = (s: string) => {
    const n = getValidInteger(s)
    setNumberOfBalloons(n)
  }

  const [balloonSize, setBalloonSize] = useState(57)
  const changeSize = (s: string) => {
    const n = getValidInteger(s)
    setBalloonSize(n)
  }

  return (
    <>
      <Title
        title={'風船コーナー'}
        description={'風船を割ることができます。(？)'}
      >
        <p>
          <MagicButton
            onClick={() => setSoundEnabled(!isSoundEnabled)}
            style={{ marginRight: '10px' }}
          >
            {isSoundEnabled ? '音を消す' : '音を鳴らす'}
          </MagicButton>
          <label style={{ marginRight: '10px' }}>
            <Input
              type="number"
              value={numberOfBalloons}
              onChange={e => changeAmount(e.target.value)}
              max={10000}
              min={1}
            />{' '}
            balloons
          </label>{' '}
          <label>
            <Input
              type="number"
              value={balloonSize}
              onChange={e => changeSize(e.target.value)}
              max={10000}
              min={1}
            />{' '}
            px
          </label>
        </p>
      </Title>
      <Block id={'balloon-window'} style={{ overflow: 'hidden' }}>
        <BalloonArray n={numberOfBalloons} width={balloonSize} />
      </Block>
    </>
  )
}
