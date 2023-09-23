'use client'

import React, { useEffect } from 'react'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'

import MainWrapper from '@/components/atoms/MainWrapper'
import Hamburger from '@/components/molecules/Hamburger'
import MobileMenu from '@/components/organisms/MobileMenu'

import { useHeaderVisibleStatus } from './hooks/useHeaderVisibleStatus'
import styles from './index.module.scss'
import { SiteName } from './SiteName'

const alwaysShowHeaderAtom = atom(false)

export function useAlwaysShownHeader() {
  const set = useSetAtom(alwaysShowHeaderAtom)
  useEffect(() => {
    set(true)
    return () => set(false)
  }, [set])
}

export function useIsAlwaysShownHeader() {
  return useAtomValue(alwaysShowHeaderAtom)
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
  const topLinks = [
    { href: '/', label: 'home' },
    { href: '/works', label: 'works' },
    { href: '/blog', label: 'blog' },
  ] as const

  return (
    <>
      <HideWhenScrollDown>
        <header id={styles.header}>
          <MainWrapper
            id={styles.inside}
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            <SiteName />
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
          </MainWrapper>
        </header>
      </HideWhenScrollDown>
      <MobileMenu />
    </>
  )
})
