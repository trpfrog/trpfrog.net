'use client'

import React from 'react'
import styles from './index.module.scss'
import { NavigationLinks } from '@/components/Navigation'
import { atom, useAtom } from 'jotai'

const mobileMenuAtom = atom(false)

export function useMobileMenuState() {
  return useAtom(mobileMenuAtom)
}

const MobileMenu = () => {
  const [isOpened, setHamburgerState] = useMobileMenuState()

  const toggleMenu = () => {
    setHamburgerState(!isOpened)
  }
  const doNothing = () => {}

  return (
    <section id={styles.mobile_menu}>
      <aside
        id={styles.menu_background}
        onClick={isOpened ? toggleMenu : doNothing}
        data-menu-opened={isOpened}
      />
      <aside id={styles.side_menu} data-menu-opened={isOpened}>
        <div id={styles.side_header} />
        <div id={styles.side_links} onClick={toggleMenu}>
          <NavigationLinks />
        </div>
      </aside>
    </section>
  )
}

export default MobileMenu
