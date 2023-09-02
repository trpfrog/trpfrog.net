import React, { CSSProperties } from 'react'
import Block from './Block'

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

const Title: React.FunctionComponent<Props> = props => {
  const { children, title, description, showDefaultText = true } = props

  return (
    <>
      <Block
        id={'title'}
        className={props.className}
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

export default Title
