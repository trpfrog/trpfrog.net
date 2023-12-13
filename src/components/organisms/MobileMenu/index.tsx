'use client'

import { useCallback, memo } from 'react'

import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Details } from '@/components/atoms/Details'
import { useSetAlwaysShownHeader } from '@/components/organisms/Header'
import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'

import styles from './index.module.scss'
import { Settings } from './Settings'

const mobileMenuAtom = atom(false)

export function useMobileMenuState() {
  return useAtom(mobileMenuAtom)
}

export function useToggleMenuCallback() {
  const [isOpened, setHamburgerState] = useMobileMenuState()
  const setAlwaysShownHeader = useSetAlwaysShownHeader()

  return useCallback(() => {
    setHamburgerState(!isOpened)
    setAlwaysShownHeader(!isOpened)
  }, [isOpened, setAlwaysShownHeader, setHamburgerState])
}

export const MobileMenu = memo(function MobileMenu() {
  const doNothing = () => {}
  const toggleMenu = useToggleMenuCallback()

  const pathname = usePathname()
  const currentLink = pathname?.split('/').slice(0, 2).join('/')

  const [isOpened] = useMobileMenuState()

  return (
    <section className={styles.mobile_menu}>
      <aside
        className={styles.menu_background}
        onClick={isOpened ? toggleMenu : doNothing}
        data-menu-opened={isOpened}
      />
      <aside className={styles.side_menu} data-menu-opened={isOpened}>
        <div className={styles.side_header} />
        <div className={styles.scrollable}>
          <div className={styles.side_links} onClick={toggleMenu}>
            {NAVIGATION_LINKS.map(({ link, name }) => (
              <Link
                href={link}
                key={link}
                data-current-page={currentLink === link}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className={styles.settings_wrapper}>
            <Details summary="高度な設定" className={styles.settings}>
              <Settings />
            </Details>
          </div>
        </div>
      </aside>
    </section>
  )
})
