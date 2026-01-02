import { useState } from 'react'

import { atom, useAtomValue, useSetAtom } from 'jotai/index'
import { useScroll } from 'motion/react'
import { usePathname } from 'next/navigation'

import { useMobileMenuState } from '@/components/organisms/MobileMenu'

import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useWindowSize } from '@/hooks/useWindowSize'

import { useUserSettingStickyHeader } from '@/states/shouldFollowHeaderAtom'
import { useUserSettingAlwaysVisibleHeader } from '@/states/shouldHideHeaderAtom'

const alwaysShowHeaderAtom = atom(false)

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

  if (userSettingAlwaysVisible || systemSideSettingAlwaysVisible || isMobileMenuOpened) {
    return true
  }

  return userSettingFollowSticky && showHeader
}

interface HeaderStatus {
  sticky: boolean
  visible: boolean
  visibleSubtitle: boolean
  visibleTrpFrog: boolean
  visibleShadow: boolean
}

export function useHeaderStatus(): HeaderStatus {
  const { y: scrollY } = useScrollPosition()
  const { width: innerWidth } = useWindowSize()
  const isTopPage = usePathname() === '/'

  const visible = useHeaderVisibleStatus()

  const [isMobileMenuOpened] = useMobileMenuState()
  const [userSettingFollowSticky] = useUserSettingStickyHeader()

  const isMobile = innerWidth <= 800

  return {
    // ヘッダーを表示するかどうか
    visible,

    // ヘッダーを viewport 上部に固定するかどうか
    sticky: isMobileMenuOpened || userSettingFollowSticky,

    // ヘッダーのサブタイトルを表示するかどうか
    visibleSubtitle: !isTopPage && scrollY > (isMobile ? 120 : 250),

    // ヘッダーのつまみアイコンを表示するかどうか
    visibleTrpFrog: isTopPage ? scrollY >= 250 : true,

    // ヘッダーの影を表示するかどうか
    visibleShadow: scrollY > 0,
  }
}
