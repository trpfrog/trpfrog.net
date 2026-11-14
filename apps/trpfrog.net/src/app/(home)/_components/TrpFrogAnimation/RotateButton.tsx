import { memo } from 'react'

import { faRotate, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toggle } from '@ui-sdk/react/toggle'

import styles from './RotateButton.module.css'

interface Props {
  isRotated: boolean
  rotateDirection: 'left' | 'right'
  onClick?: () => void
}

export const RotateButton = memo(function RotateButton(props: Props) {
  return (
    <Toggle
      pressed={props.isRotated}
      onPressedChange={() => props.onClick?.()}
      aria-label="つまみを回す"
      data-rotate-direction={props.isRotated ? undefined : props.rotateDirection}
      className={styles.angle_picker_button}
      data-testid="rotate-button"
    >
      {props.isRotated ? (
        <FontAwesomeIcon icon={faStop} />
      ) : (
        <FontAwesomeIcon
          icon={faRotate}
          flip={props.rotateDirection === 'left' ? 'horizontal' : undefined}
        />
      )}
    </Toggle>
  )
})
