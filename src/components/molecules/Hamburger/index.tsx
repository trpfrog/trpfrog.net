'use client'

import React from 'react'

import { useMobileMenuState } from '@/components/organisms/MobileMenu'

import styles from './index.module.scss'

const Hamburger = () => {
  const [isOpened, setHamburgerState] = useMobileMenuState()
  return (
    <div id={styles.hamburger_menu}>
      <a
        id={styles.menu_trigger}
        onClick={() => setHamburgerState(!isOpened)}
        data-menu-opened={isOpened}
      >
        <span />
        <span />
        <span /> {/* Hamburger Icon in CSS */}
      </a>
    </div>
  )
}

export default Hamburger
