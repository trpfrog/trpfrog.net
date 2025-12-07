import { CSSProperties } from 'react'
import * as React from 'react'

import { WavyTitle } from '@/components/atoms/WavyTitle'
import { Block } from '@/components/molecules/Block'

import { twMerge } from '@/lib/tailwind/merge'

type Props = {
  title?: string
  description?: string
  ribbonText?: string
  cardImageUrl?: string
  showDefaultText?: boolean
  children?: React.ReactNode
  style?: CSSProperties
  className?: string
}

export const Title: React.FunctionComponent<Props> = props => {
  const { children, title, description, showDefaultText = true } = props

  return (
    <>
      <Block
        className={twMerge('tw:_p:mb-0', props.className)}
        ribbonText={props.ribbonText ?? ''}
        style={props.style}
      >
        <div>
          {showDefaultText && title && <WavyTitle text={title} />}
          {showDefaultText && description && <p>{description}</p>}
          {children}
        </div>
      </Block>
    </>
  )
}
