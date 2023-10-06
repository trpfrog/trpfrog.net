'use client'

import React from 'react'

import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CircleButton } from '@/components/atoms/CircleButton'

import styles from './index.module.scss'

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function BackToTop() {
  return (
    <CircleButton id={styles.page_top} onClick={backToTop}>
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </CircleButton>
  )
}
