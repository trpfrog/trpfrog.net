'use client'

import { useId, useState } from 'react'

import { validateUnknown } from '@trpfrog.net/utils'
import { vCoerceNumber } from '@trpfrog.net/utils/valibot'
import * as v from 'valibot'

import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { Input } from '@/components/wrappers'

import { clamp } from '@/lib/utils'

import { BalloonArray } from './_components/BalloonArray'
import { useBalloonState } from './useBalloonState.ts'

const FormNumberSchema = (max: number, defaultValue: number) =>
  v.fallback(
    v.pipe(
      vCoerceNumber,
      v.integer(),
      v.transform(n => clamp(n, 1, max)),
    ),
    defaultValue,
  )

export function BalloonApp() {
  const [isSoundEnabled, setSoundEnabled] = useState(false)

  const [balloonSize, _setBalloonSize] = useState(57)
  const setBalloonSize = (s: number | string) => {
    const n = validateUnknown(FormNumberSchema(1000, 57), s)
    _setBalloonSize(n)
  }

  const rewardStartPositionId = useId()
  const balloonState = useBalloonState(96, {
    rewardId: rewardStartPositionId,
  })
  const setBalloonAmount = (s: number | string) => {
    const value = validateUnknown(FormNumberSchema(10000, 96), s)
    balloonState.updateAmount(value)
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
              value={balloonState.balloons.length}
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
        <BalloonArray states={balloonState} width={balloonSize} enableSound={isSoundEnabled} />
        <div id={rewardStartPositionId} className="tw-fixed tw-top-0 tw-left-1/2" />
      </Block>
    </>
  )
}
