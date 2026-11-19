'use client'

import { useState, useRef, useEffect } from 'react'

import { Button } from '@ui-sdk/react/button'

import { FoggedDiv, FoggedDivProps } from '@/components/atoms/FoggedDiv'
import { measureCSSLength } from '@/components/molecules/ShowAll/measureCSSLength'

import styles from './index.module.css'

type ShowAllProps = FoggedDivProps & {
  showAllByDefault?: boolean
}

export function ShowAll(props: ShowAllProps) {
  const { className = '', height, fogHeight, showAllByDefault, children, ...rest } = props
  const [isShowAll, setIsShowAll] = useState(showAllByDefault ?? false)
  const [needsFog, setNeedsFog] = useState(true) // コンテンツが少なすぎるときは Fog を表示しない

  const ref = useRef<HTMLDivElement>(null)

  // コンテンツの高さから、Fog を表示するかどうかを決める
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const innerHeight = container.clientHeight
    const maxHeightPx = measureCSSLength(container, height)
    if (innerHeight && maxHeightPx) {
      setNeedsFog(innerHeight > maxHeightPx)
    }
  }, [children, height])

  return (
    <div className={className} {...rest}>
      {!needsFog || isShowAll ? (
        <div className={styles.show_all} data-testid="visible-contents">
          <div ref={ref}>{children}</div>
        </div>
      ) : (
        <FoggedDiv height={height} fogHeight={fogHeight} data-testid="hidden-contents">
          <div ref={ref}>{children}</div>
        </FoggedDiv>
      )}
      {needsFog && (
        <div className={styles.button_wrapper}>
          <Button
            data-testid="show-all-button"
            className={styles.button}
            aria-expanded={isShowAll}
            onClick={() => setIsShowAll(prev => !prev)}
          >
            {isShowAll ? '折りたたむ' : 'もっと見る'}
          </Button>
        </div>
      )}
    </div>
  )
}
