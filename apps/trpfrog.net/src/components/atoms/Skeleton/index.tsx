import * as React from 'react'

import styles from './index.module.css'

interface SkeletonProps {
  /** 何行ぶん並べるか */
  count?: number
  /** 行のあとで改行しない */
  inline?: boolean
  height?: React.CSSProperties['height']
  className?: string
  style?: React.CSSProperties
  /** 行をまとめる要素のクラス */
  containerClassName?: string
}

/**
 * 読み込み中の文字や画像の場所を示す灰色の帯。高さは指定がなければ 1 行ぶん
 *
 * 見た目と 1 行ずつ並べる作りは react-loading-skeleton (MIT) をもとにしている。
 * 元のライセンス表示は index.module.css にある
 */
export function Skeleton(props: SkeletonProps) {
  const { count = 1, inline = false, height, className = '', style, containerClassName } = props
  return (
    <span className={containerClassName} aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <React.Fragment key={i}>
          <span className={`${styles.skeleton} ${className}`} style={{ height, ...style }}>
            &zwnj;
          </span>
          {!inline && <br />}
        </React.Fragment>
      ))}
    </span>
  )
}
