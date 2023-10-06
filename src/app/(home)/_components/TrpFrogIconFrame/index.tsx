import React, { Suspense } from 'react'

import { WaveText } from '@/components/atoms/WaveText'
import { Block } from '@/components/molecules/Block'

import { Description } from './Description'
import { IconFrame } from './IconFrame'

type Props = React.ComponentPropsWithoutRef<'div'>

export function TrpFrogIconFrame(props: Props) {
  return (
    <Block title={'AIつまみアイコン'} h2icon={'robot'} {...props}>
      <IconFrame />
      <hr />
      <Suspense
        fallback={
          <p style={{ textAlign: 'center' }}>
            <WaveText>Loading...</WaveText>
          </p>
        }
      >
        <Description />
      </Suspense>
    </Block>
  )
}
