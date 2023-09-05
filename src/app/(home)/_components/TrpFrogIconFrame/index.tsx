import React from 'react'

import { IconFrame } from '@/app/(home)/_components/TrpFrogIconFrame/IconFrame'

import Block from '@/components/molecules/Block'

type Props = React.ComponentProps<'div'>

export default function TrpFrogIconFrame(props: Props) {
  return (
    <Block title={'TrpFrog Diffusion'} h2icon={'robot'} {...props}>
      <IconFrame />
      <hr />
      <small style={{ fontSize: '0.6em' }}>
        <div>この画像は一定時間ごとに自動生成されます。</div>
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
