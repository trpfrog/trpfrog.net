'use client'

import React from 'react'

type Props = React.ComponentPropsWithoutRef<'div'>
import styles from './index.module.scss'

export function HoverScrollBox(props: Props) {
  const { className = '', children, ...rest } = props

  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [intervalId, setIntervalId] = React.useState<number | null>(null)

  // ボタンに hover したら自動でスクロール, (dx, dy) は単位時間あたりのスクロール量
  const onMouseEnter = React.useCallback(
    (dx: number, dy: number) => () => {
      if (scrollAreaRef.current == null) return

      // 自動スクロール
      const scrollSpeed = 10
      const newIntervalId = window.setInterval(() => {
        scrollAreaRef.current!.scrollBy(dx * scrollSpeed, dy * scrollSpeed)
      }, 25)

      // 別の自動スクロールが動いていたらキャンセルしておく
      if (intervalId != null) window.clearInterval(intervalId)
      setIntervalId(newIntervalId)
    },
    [intervalId],
  )

  // ボタンから離れたら自動スクロールを止める
  const onMouseLeave = React.useCallback(() => {
    if (intervalId == null) return
    window.clearInterval(intervalId)
    setIntervalId(null)
  }, [intervalId])

  // スクロール位置に応じてボタンの見た目を変える
  const scrollUpRef = React.useRef<HTMLDivElement>(null)
  const scrollDownRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const minOpacity = '0'
    const maxOpacity = '0.5'

    scrollAreaRef.current?.addEventListener('scroll', e => {
      if (scrollUpRef.current == null || scrollDownRef.current == null) return

      const { scrollTop, scrollHeight, clientHeight } =
        e.target as HTMLDivElement
      const scrollBottom = scrollHeight - scrollTop - clientHeight

      // 最大までスクロールしたら透明にする
      scrollUpRef.current.style.opacity =
        scrollTop === 0 ? minOpacity : maxOpacity
      scrollDownRef.current.style.opacity =
        scrollBottom === 0 ? minOpacity : maxOpacity
    })

    // ボタンの見た目の初期値
    if (scrollUpRef.current != null) {
      scrollUpRef.current.style.opacity = minOpacity // 一番上なので透明
    }
    if (scrollDownRef.current != null) {
      scrollDownRef.current.style.opacity = maxOpacity
    }
  }, [])

  return (
    <div className={`${styles.box} ${className}`} {...rest}>
      <div
        ref={scrollUpRef}
        className={styles.scroll_up}
        onMouseEnter={onMouseEnter(0, -1)}
        onTouchStart={onMouseEnter(0, -1)}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onMouseLeave}
        onTouchCancel={onMouseLeave}
      >
        ▲
      </div>
      <div
        ref={scrollDownRef}
        className={styles.scroll_down}
        onMouseEnter={onMouseEnter(0, 1)}
        onTouchStart={onMouseEnter(0, 1)}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onMouseLeave}
        onTouchCancel={onMouseLeave}
      >
        ▼
      </div>
      <div className={styles.scroll_box_wrapper}>
        <div className={styles.scroll_box} ref={scrollAreaRef}>
          {children}
        </div>
      </div>
    </div>
  )
}
