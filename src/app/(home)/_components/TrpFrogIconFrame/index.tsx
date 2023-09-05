import React from 'react'

import { IconFrame } from '@/app/(home)/_components/TrpFrogIconFrame/IconFrame'

import Block from '@/components/molecules/Block'

import { TRPFROG_DIFFUSION_UPDATE_HOURS } from '@/lib/constants'

type Props = React.ComponentProps<'div'>

export default function TrpFrogIconFrame(props: Props) {
  return (
    <Block title={'AIつまみアイコン'} h2icon={'robot'} {...props}>
      <IconFrame />
      <hr />
      <small style={{ fontSize: '0.6em', textAlign: 'center' }}>
        <div>
          これは AI により自動生成された画像です。
          <br />
          最後の生成から{TRPFROG_DIFFUSION_UPDATE_HOURS}
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
