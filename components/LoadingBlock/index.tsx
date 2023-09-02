import styles from './index.module.scss'
import Block from '@/components/Block'
import { CSSProperties } from 'react'

type Props = {
  isFullHeight?: boolean
  style?: CSSProperties
}

export default function LoadingBlock({
  isFullHeight = false,
  ...props
}: Props) {
  return (
    <Block
      className={isFullHeight ? styles.fullscreen_block : ''}
      style={props.style}
    >
      <div className={styles.wrapper}>
        <span className={styles.text}>
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </Block>
  )
}
