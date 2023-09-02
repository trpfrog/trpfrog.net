'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styles from './index.module.scss'

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export default function BackToTop() {
  return (
    <div id={styles.page_top} onClick={backToTop}>
      <span id={styles.back_to_top_icon}>
        <FontAwesomeIcon icon={faAngleDoubleUp} />
      </span>
    </div>
  )
}
