'use client'

import { useState } from 'react'

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

  // コンテンツの高さから、Fog を表示するかどうかを決める。
  // 画像の読み込みなどで後から高さが変わることもあるので、サイズの変化を監視する
  const observeContentHeight = (container: HTMLDivElement) => {
    const observer = new ResizeObserver(() => {
      const innerHeight = container.clientHeight
      const maxHeightPx = measureCSSLength(container, height)
      if (innerHeight && maxHeightPx) {
        setNeedsFog(innerHeight > maxHeightPx)
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }

  return (
    <div className={className} {...rest}>
      {!needsFog || isShowAll ? (
        <div className={styles.show_all} data-testid="visible-contents">
          <div ref={observeContentHeight}>{children}</div>
        </div>
      ) : (
        <FoggedDiv height={height} fogHeight={fogHeight} data-testid="hidden-contents">
          <div ref={observeContentHeight}>{children}</div>
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
