'use client'

import React from 'react'

import { FoggedDiv, FoggedDivProps } from '@/components/atoms/FoggedDiv'

import styles from './index.module.scss'

export type ShowAllProps = FoggedDivProps & {
  showAllByDefault?: boolean
}

export function ShowAll(props: ShowAllProps) {
  const {
    className = '',
    height,
    fogHeight,
    showAllByDefault,
    children,
    ...rest
  } = props
  const [isShowAll, setIsShowAll] = React.useState(showAllByDefault ?? false)
  return (
    <div className={className} {...rest}>
      {isShowAll ? (
        <div className={styles.show_all} data-testid="visible-contents">
          {children}
        </div>
      ) : (
        <FoggedDiv
          height={height}
          fogHeight={fogHeight}
          data-testid="hidden-contents"
        >
          {children}
        </FoggedDiv>
      )}
      <div className={styles.button_wrapper}>
        <button
          data-testid="show-all-button"
          className={styles.button}
          onClick={() => setIsShowAll(prev => !prev)}
        >
          {isShowAll ? '折りたたむ' : 'もっと見る'}
        </button>
      </div>
    </div>
  )
}
