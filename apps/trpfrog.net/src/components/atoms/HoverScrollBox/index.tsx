'use client'

type Props = React.ComponentPropsWithoutRef<'div'>

import * as React from 'react'
import { useRef } from 'react'

import styles from './index.module.scss'
import { useHoverScrollBoxEvent } from './useHoverScrollBoxEvent'
import { useScrollPosition } from './useScrollPosition'

export function HoverScrollBox(props: Props) {
  const { className = '', children, ...rest } = props

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { handleMouseEnter, handleMouseLeave } =
    useHoverScrollBoxEvent(scrollAreaRef)
  const { scrollPosition, handleScroll } = useScrollPosition()

  return (
    <div className={`${styles.box} ${className}`} {...rest}>
      <div
        className={styles.scroll_up}
        onMouseEnter={handleMouseEnter(0, -1)}
        onTouchStart={handleMouseEnter(0, -1)}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
        data-scroll-position={scrollPosition}
      >
        ▲
      </div>
      <div
        className={styles.scroll_down}
        onMouseEnter={handleMouseEnter(0, 1)}
        onTouchStart={handleMouseEnter(0, 1)}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
        data-scroll-position={scrollPosition}
      >
        ▼
      </div>
      <div className={styles.scroll_box_wrapper}>
        <div
          className={styles.scroll_box}
          ref={scrollAreaRef}
          onScroll={handleScroll}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
