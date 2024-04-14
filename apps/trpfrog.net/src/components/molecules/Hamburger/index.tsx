'use client'
import { memo } from 'react'

import {
  useMobileMenuState,
  useToggleMenuCallback,
} from '@/components/organisms/MobileMenu'

import styles from './index.module.scss'

export const Hamburger = memo(function Hamburger() {
  const [isOpened] = useMobileMenuState()
  const toggleMenuCallback = useToggleMenuCallback()

  return (
    <div id={styles.hamburger_menu}>
      <a
        id={styles.menu_trigger}
        onClick={toggleMenuCallback}
        data-menu-opened={isOpened}
      >
        <span />
        <span />
        <span /> {/* Hamburger Icon in CSS */}
      </a>
    </div>
  )
})
