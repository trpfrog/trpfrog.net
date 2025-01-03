import { CSSProperties } from 'react'
import * as React from 'react'

import { Metadata } from 'next'

import { WavyTitle } from '@/components/atoms/WavyTitle'
import { Block } from '@/components/molecules/Block'

import { twMerge } from '@/lib/tailwind/merge'

interface TitleProps {
  title?: string
  description?: string
  ribbonText?: string
  cardImageUrl?: string
  showDefaultText?: boolean
  children?: React.ReactNode
  style?: CSSProperties
  className?: string
}

export const Title: React.FunctionComponent<TitleProps> = props => {
  const { children, title, description, showDefaultText = true } = props

  return (
    <>
      <Block
        className={twMerge('&_p:tw-mb-0', props.className)}
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

export function createMetadataWithTitle(metadata: Metadata) {
  return {
    ...metadata,
    Title: (props: TitleProps) => (
      <Title
        title={(metadata.title as string) ?? undefined}
        description={(metadata.description as string) ?? undefined}
        {...props}
      />
    ),
  }
}
