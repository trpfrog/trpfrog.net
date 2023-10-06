import React from 'react'

import { get } from '@vercel/edge-config'

import { IconFrame } from '@/app/(home)/_components/TrpFrogIconFrame/IconFrame'

import { Block } from '@/components/molecules/Block'

import {
  TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS,
  TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY,
} from '@/lib/constants'

type Props = React.ComponentPropsWithoutRef<'div'>

export async function TrpFrogIconFrame(props: Props) {
  const updateHours =
    (await get<number>(TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY)) ??
    TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS

  return (
    <Block title={'AIつまみアイコン'} h2icon={'robot'} {...props}>
      <IconFrame />
      <hr />
      <small style={{ fontSize: '0.6em', textAlign: 'center' }}>
        <div>
          これは AI により自動生成された画像です。
          <br />
          最後の生成から{updateHours}
          時間経つと再生成されます。
        </div>
        <div>
          Powered by{' '}
          <a href={'https://huggingface.co/Prgckwb/trpfrog-diffusion'}>
            Prgckwb/trpfrog-diffusion
          </a>
        </div>
      </small>
    </Block>
  )
}
