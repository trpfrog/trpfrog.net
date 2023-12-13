'use client'
import { useEffect } from 'react'
import * as React from 'react'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import {
  useMobileMenuState,
  MobileMenu,
} from '@/components/organisms/MobileMenu'

import { useShouldFollowHeaderAtom } from '@/states/shouldFollowHeaderAtom'

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

export function useSetAlwaysShownHeader() {
  return useSetAtom(alwaysShowHeaderAtom)
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
  const [isMobileMenuOpened] = useMobileMenuState()
  const [userSettingFollowSticky] = useShouldFollowHeaderAtom()

  const useSticky = userSettingFollowSticky || isMobileMenuOpened // メニューを開いているときは強制的にヘッダを表示
  return (
    <div
      className={styles.hide_when_scroll_down}
      data-show={useSticky ? showHeader : true} // sticky でないときはアニメーションを無効化
      style={useSticky ? { position: 'sticky' } : { position: 'relative' }}
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
