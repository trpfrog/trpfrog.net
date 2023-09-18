import React from 'react'

import { faRotate, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './RotateButton.module.scss'

interface Props {
  isRotated: boolean
  rotateDirection: 'left' | 'right'
  onClick?: () => void
}

const RotateButton = React.memo(function RotateButton(props: Props) {
  return (
    <>
      <button
        data-rotate-direction={
          props.isRotated ? undefined : props.rotateDirection
        }
        className={styles.angle_picker_button}
        onClick={props.onClick}
      >
        {props.isRotated ? (
          <FontAwesomeIcon icon={faStop} />
        ) : (
          <FontAwesomeIcon
            icon={faRotate}
            flip={props.rotateDirection === 'left' ? 'horizontal' : undefined}
          />
        )}
      </button>
    </>
  )
})

export default RotateButton
