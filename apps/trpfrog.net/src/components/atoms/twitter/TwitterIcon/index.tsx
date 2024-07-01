import * as React from 'react'

import styles from './index.module.scss'
import { iconPreset } from './preset'

export type TwitterIconProps = {
  preset?: keyof typeof iconPreset
  iconStyle?: React.CSSProperties['background']
}

export function TwitterIcon(props: TwitterIconProps) {
  const { preset, iconStyle } = props
  const background = preset && preset in iconPreset ? iconPreset[preset] : iconStyle
  return (
    <div
      className={styles.icon}
      style={{
        background: background ?? 'url(/twitter-icon.png) no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}
