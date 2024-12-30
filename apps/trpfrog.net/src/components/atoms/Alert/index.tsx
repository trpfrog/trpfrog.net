import * as React from 'react'

import {
  faCircleInfo,
  faFrog,
  faTriangleExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import styles from './index.module.css'

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
      className: classNames(styles.caution, styles.text_box),
    },
    frog: {
      icon: faFrog,
      className: classNames(styles.frog, styles.text_box),
    },
    info: {
      icon: faCircleInfo,
      className: classNames(styles.info, styles.text_box),
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
