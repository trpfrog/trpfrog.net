'use client'

import { useRef, useState } from 'react'

import { NumberField } from '@/components/atoms/FormControls'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import { PreloadBalloonImages } from './_components/Balloon/preload-balloon-images.tsx'
import { BalloonArray } from './_components/BalloonArray'
import { useBalloonState } from './useBalloonState.ts'

export function BalloonApp() {
  const [isSoundEnabled, setSoundEnabled] = useState(false)

  const [balloonSize, setBalloonSize] = useState(57)

  const rewardRef = useRef<HTMLDivElement>(null)
  const balloonState = useBalloonState(96, { rewardRef })

  return (
    <>
      <PreloadBalloonImages />
      <Title title="Balloons" description={'風船を割ることができます。(？)'}>
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-2.5 tw:gap-y-1">
          <RichButton onClick={() => setSoundEnabled(!isSoundEnabled)}>
            {isSoundEnabled ? '音を消す' : '音を鳴らす'}
          </RichButton>
          <NumberField
            label="balloons"
            value={balloonState.balloons.length}
            min={1}
            max={10000}
            onValueChange={n => balloonState.updateAmount(Math.round(n))}
          />
          <NumberField
            label="px"
            value={balloonSize}
            min={1}
            max={1000}
            onValueChange={n => setBalloonSize(Math.round(n))}
          />
        </div>
      </Title>
      <Block id={'balloon-window'} style={{ overflow: 'hidden' }}>
        <BalloonArray states={balloonState} width={balloonSize} enableSound={isSoundEnabled} />
        <div ref={rewardRef} className="tw:fixed tw:top-0 tw:left-1/2" />
      </Block>
    </>
  )
}
