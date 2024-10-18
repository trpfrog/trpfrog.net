'use client'

import { useState, useRef, useEffect } from 'react'

import { FoggedDiv, FoggedDivProps } from '@/components/atoms/FoggedDiv'
import { usePixelValueFromCSSLength } from '@/components/molecules/ShowAll/usePixelValueFromCSSLength'

import styles from './index.module.scss'

type ShowAllProps = FoggedDivProps & {
  showAllByDefault?: boolean
}

export function ShowAll(props: ShowAllProps) {
  const { className = '', height, fogHeight, showAllByDefault, children, ...rest } = props
  const [isShowAll, setIsShowAll] = useState(showAllByDefault ?? false)
  const [needsFog, setNeedsFog] = useState(true) // コンテンツが少なすぎるときは Fog を表示しない

  const ref = useRef<HTMLDivElement>(null)
  const maxHeightPx = usePixelValueFromCSSLength(ref, height)

  // コンテンツの高さから、Fog を表示するかどうかを決める
  useEffect(() => {
    const innerHeight = ref.current?.clientHeight
    if (innerHeight && maxHeightPx) {
      setNeedsFog(innerHeight > maxHeightPx)
    }
  }, [children, height, maxHeightPx])

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
          <button
            data-testid="show-all-button"
            className={styles.button}
            onClick={() => setIsShowAll(prev => !prev)}
          >
            {isShowAll ? '折りたたむ' : 'もっと見る'}
          </button>
        </div>
      )}
    </div>
  )
}
