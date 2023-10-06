import React, { CSSProperties } from 'react'

import { Block } from '@/components/molecules/Block'

import styles from './index.module.scss'

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
        className={`${styles.title} ${props.className}`}
        ribbonText={props.ribbonText ?? ''}
        style={props.style}
      >
        <div>
          {showDefaultText && title && <h1>{title}</h1>}
          {showDefaultText && description && <p>{description}</p>}
          {children}
        </div>
      </Block>
    </>
  )
}
