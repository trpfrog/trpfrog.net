'use client'
import * as React from 'react'

import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import { useHeaderStatus } from '@/components/organisms/Header/hooks/useHeaderStatus'
import { MobileMenu } from '@/components/organisms/MobileMenu'

export { StickToTop } from './StickToTop'
export {
  useSetAlwaysShownHeader,
  useHeaderStatus,
} from './hooks/useHeaderStatus'

import styles from './index.module.scss'
import { SiteName } from './SiteName'

const HideWhenScrollDown = (props: { children: React.ReactNode }) => {
  const headerStatus = useHeaderStatus()

  return (
    <div
      className={styles.hide_when_scroll_down}
      data-show={headerStatus.visible} // sticky でないときはアニメーションを無効化
      style={
        headerStatus.visible ? { position: 'sticky' } : { position: 'relative' }
      }
    >
      {props.children}
    </div>
  )
}

type Props = {
  title?: React.ReactNode
}

export const Header = React.memo(function Header(props: Props) {
  const topLinks = [
    { href: '/', label: 'home' },
    { href: '/works', label: 'works' },
    { href: '/blog', label: 'blog' },
  ] as const

  return (
    <>
      <HideWhenScrollDown>
        <header className={styles.header}>
          <MainWrapper
            className={styles.inside}
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            <SiteName />
            <div className={styles.nav_wrapper}>
              <nav className={styles.navigation}>
                <ul>
                  {topLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className={styles.title_link}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Hamburger />
            </div>
          </MainWrapper>
        </header>
      </HideWhenScrollDown>
      <MobileMenu />
    </>
  )
})
