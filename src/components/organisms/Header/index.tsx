'use client'

import React, { useEffect, useState } from 'react'

import { useScroll } from 'framer-motion'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Hamburger from '@/components/molecules/Hamburger'
import MobileMenu from '@/components/organisms/MobileMenu'

import styles from './index.module.scss'
import { NormalTitle } from './NormalTitle'
import { TopTitle } from './TopTitle'

const alwaysShowHeaderAtom = atom(false)

export function useAlwaysShownHeader() {
  const set = useSetAtom(alwaysShowHeaderAtom)
  useEffect(() => {
    set(true)
    return () => set(false)
  }, [set])
}

const useHeaderVisibleStatus = () => {
  const { scrollY } = useScroll()
  const [showHeader, setShowHeader] = useState(true)

  scrollY.on('change', (y: number) => {
    const v = scrollY.getVelocity()
    const shouldShowHeader = v < -1000 || y < 500
    const shouldHideHeader = !shouldShowHeader && v > 1000

    if (shouldShowHeader) {
      setShowHeader(true)
    } else if (shouldHideHeader) {
      setShowHeader(false)
    }
  })

  const hide = useAtomValue(alwaysShowHeaderAtom)
  return showHeader || hide
}

export const HeaderFollowSticky = (props: {
  children: React.ReactNode
  top: string | number
}) => {
  const headerVisible = useHeaderVisibleStatus()
  const getStyle = (isHeaderVisible: boolean) =>
    isHeaderVisible
      ? `calc(var(--header-height) + ${props.top})`
      : `${props.top}`

  return (
    <div
      style={{
        transition: '0.1s',
        position: 'sticky',
        top: getStyle(headerVisible),
      }}
    >
      {props.children}
    </div>
  )
}

const HideWhenScrollDown = (props: { children: React.ReactNode }) => {
  const showHeader = useHeaderVisibleStatus()
  return (
    <div id={styles.hide_when_scroll_down} data-show={showHeader}>
      {props.children}
    </div>
  )
}

type Props = {
  title?: React.ReactNode
}

export default React.memo(function Header(props: Props) {
  const pathname = usePathname()
  const topLinks = [
    { href: '/', label: 'home' },
    { href: '/works', label: 'works' },
    { href: '/blog', label: 'blog' },
  ] as const

  const { title = pathname === '/' ? <TopTitle /> : <NormalTitle /> } = props

  return (
    <>
      <HideWhenScrollDown>
        <header id={styles.header}>
          <div id={styles.inside}>
            {title}
            <nav id={styles.navigation}>
              <ul>
                {topLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`headerButton ${styles.title_link}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Hamburger />
          </div>
        </header>
      </HideWhenScrollDown>
      <MobileMenu />
    </>
  )
})
