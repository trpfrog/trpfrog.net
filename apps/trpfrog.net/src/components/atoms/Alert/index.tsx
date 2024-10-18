import * as React from 'react'

import {
  faCircleInfo,
  faFrog,
  faTriangleExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './index.module.scss'

type AlertTypes = 'caution' | 'frog' | 'info'

type AlertAppearance = {
  icon: IconDefinition
  className: string
}

type Props = React.ComponentPropsWithoutRef<'div'> & {
  type: AlertTypes
}

export function Alert(props: Props) {
  const { title, children, type, className = '', ...rest } = props

  const alertAppearance: Record<AlertTypes, AlertAppearance> = {
    caution: {
      icon: faTriangleExclamation,
      className: styles.caution,
    },
    frog: {
      icon: faFrog,
      className: styles.frog,
    },
    info: {
      icon: faCircleInfo,
      className: styles.info,
    },
  }

  return (
    <div className={`${alertAppearance[type].className} ${className}`} {...rest}>
      <div className={styles.text_box_icon}>
        <FontAwesomeIcon icon={alertAppearance[type].icon} />
      </div>
      <div className={styles.text_box_content}>{children}</div>
    </div>
  )
}
