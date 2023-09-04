import styles from './index.module.scss'
import Block from '@/components/molecules/Block'
import { CSSProperties } from 'react'
import WaveText from '@/components/atoms/WaveText'

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
        <WaveText className={styles.text}>Loading...</WaveText>
      </div>
    </Block>
  )
}
