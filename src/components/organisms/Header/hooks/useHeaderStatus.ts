import { useEffect, useMemo, useState } from 'react'

import { useScroll } from 'framer-motion'
import { atom, useAtomValue, useSetAtom } from 'jotai/index'
import { usePathname } from 'next/navigation'

import { useMobileMenuState } from '@/components/organisms/MobileMenu'

import { useUserSettingStickyHeader } from '@/states/shouldFollowHeaderAtom'
import { useUserSettingAlwaysVisibleHeader } from '@/states/shouldHideHeaderAtom'

const alwaysShowHeaderAtom = atom(false)

export function useAlwaysShownHeader() {
  const set = useSetAtom(alwaysShowHeaderAtom)
  useEffect(() => {
    set(true)
    return () => set(false)
  }, [set])
}

export function useSetAlwaysShownHeader() {
  return useSetAtom(alwaysShowHeaderAtom)
}

/**
 * ヘッダーを表示するかどうかを返す
 */
function useHeaderVisibleStatus(): boolean {
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

  const systemSideSettingAlwaysVisible = useAtomValue(alwaysShowHeaderAtom)
  const [userSettingAlwaysVisible] = useUserSettingAlwaysVisibleHeader()

  const [isMobileMenuOpened] = useMobileMenuState()
  const [userSettingFollowSticky] = useUserSettingStickyHeader()

  if (
    userSettingAlwaysVisible ||
    systemSideSettingAlwaysVisible ||
    isMobileMenuOpened
  ) {
    return true
  }

  return userSettingFollowSticky && showHeader
}

/**
 * ヘッダーのサブタイトルを表示するかどうかを返す
 */
function useSubtitleVisibleStatus(): boolean {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const isTopPage = usePathname() === '/'
  const [heightToChangeTitle, setHeightToChangeTitle] = useState(250)

  useEffect(() => {
    if (isTopPage) {
      return
    }
    const isMobile = window.innerWidth <= 800
    setHeightToChangeTitle(isMobile ? 120 : 250)
  }, [isTopPage])

  const { scrollY } = useScroll()

  if (isTopPage) {
    return false
  }

  scrollY.on('change', (y: number) => {
    setShowPageTitle(y > heightToChangeTitle)
  })

  return showPageTitle
}

/**
 * ヘッダーのつまみアイコンを表示するかどうかを返す
 */
function useTrpFrogVisibleStatus(): boolean {
  const [visible, setVisible] = useState(false)
  const isTopPage = usePathname() === '/'
  const animationHeight = 250

  const { scrollY } = useScroll()
  useEffect(() => {
    if (!isTopPage) {
      return
    }
    setVisible(window.scrollY >= animationHeight)
  }, [isTopPage])

  if (!isTopPage) {
    return true
  }

  scrollY.on('change', () => {
    setVisible(window.scrollY >= animationHeight)
  })

  return visible
}

interface HeaderStatus {
  visible: boolean
  visibleSubtitle: boolean
  visibleTrpFrog: boolean
}

export function useHeaderStatus(): HeaderStatus {
  const visible = useHeaderVisibleStatus()
  const visibleSubtitle = useSubtitleVisibleStatus()
  const visibleTrpFrog = useTrpFrogVisibleStatus()
  return useMemo(
    () => ({ visible, visibleSubtitle, visibleTrpFrog }),
    [visible, visibleSubtitle, visibleTrpFrog],
  )
}
