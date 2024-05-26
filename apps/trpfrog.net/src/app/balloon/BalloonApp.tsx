'use client'

import { useState } from 'react'

import { z } from 'zod'

import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { Input } from '@/components/wrappers'

import { clamp } from '@/lib/utils'

import { useBalloonSound } from './_components/Balloon'
import { BalloonArray } from './_components/BalloonArray'

export function BalloonApp() {
  const { isSoundEnabled, setSoundEnabled } = useBalloonSound()

  const [balloonAmount, _setBalloonAmount] = useState(96)
  const setBalloonAmount = (s: number | string) => {
    const n = z.coerce.number().int().safeParse(s)
    _setBalloonAmount(clamp(n.data ?? 96, 1, 10000))
  }

  const [balloonSize, _setBalloonSize] = useState(57)
  const setBalloonSize = (s: number | string) => {
    const n = z.coerce.number().int().safeParse(s)
    _setBalloonSize(clamp(n.data ?? 57, 1, 1000))
  }

  return (
    <>
      <Title title="Balloons" description={'風船を割ることができます。(？)'}>
        <p>
          <RichButton
            as="button"
            onClick={() => setSoundEnabled(!isSoundEnabled)}
            style={{ marginRight: '10px' }}
          >
            {isSoundEnabled ? '音を消す' : '音を鳴らす'}
          </RichButton>
          <label style={{ marginRight: '10px' }}>
            <Input
              type="number"
              value={balloonAmount}
              onChange={e => setBalloonAmount(e.target.value)}
              max={10000}
              min={1}
            />{' '}
            balloons
          </label>{' '}
          <label>
            <Input
              type="number"
              value={balloonSize}
              onChange={e => setBalloonSize(e.target.value)}
              max={1000}
              min={1}
            />{' '}
            px
          </label>
        </p>
      </Title>
      <Block id={'balloon-window'} style={{ overflow: 'hidden' }}>
        <BalloonArray n={balloonAmount} width={balloonSize} />
      </Block>
    </>
  )
}
