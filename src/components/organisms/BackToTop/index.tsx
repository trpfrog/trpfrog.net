'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styles from './index.module.scss'
import CircleButton from '@/components/atoms/CircleButton'

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export default function BackToTop() {
  return (
    <CircleButton id={styles.page_top} onClick={backToTop}>
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </CircleButton>
  )
}
