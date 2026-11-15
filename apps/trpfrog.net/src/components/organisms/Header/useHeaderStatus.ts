import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { useMotionValueEvent, useScroll } from 'motion/react'

import { useIsMobileMenuOpened } from '@/components/organisms/MobileMenu'
import { useWindowScroll } from '@/hooks/useWindowScroll'
import {
  useUserSettingAlwaysVisibleHeader,
  useUserSettingStickyHeader,
} from '@/states/userSettings'

// useWindowScroll で購読する、スクロール量がしきい値を超えたかどうかのビット
const SCROLLED = 1
const PAST_TITLE = 2
const PAST_TRPFROG = 4

/**
 * ヘッダーを表示するかどうかを返す
 */
function useHeaderVisibleStatus(): boolean {
  const { scrollY } = useScroll()
  const [showHeader, setShowHeader] = useState(true)

  // 解除までするフックで購読する。描画のたびに .on で登録すると購読が溜まる
  useMotionValueEvent(scrollY, 'change', y => {
    const v = scrollY.getVelocity()
    const shouldShowHeader = v < -1000 || y < 500
    const shouldHideHeader = !shouldShowHeader && v > 1000

    if (shouldShowHeader) {
      setShowHeader(true)
    } else if (shouldHideHeader) {
      setShowHeader(false)
    }
  })

  const [userSettingAlwaysVisible] = useUserSettingAlwaysVisibleHeader()

  const isMobileMenuOpened = useIsMobileMenuOpened()
  const [userSettingFollowSticky] = useUserSettingStickyHeader()

  if (userSettingAlwaysVisible || isMobileMenuOpened) {
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
  const isTopPage = usePathname() === '/'

  const visible = useHeaderVisibleStatus()

  const isMobileMenuOpened = useIsMobileMenuOpened()
  const [userSettingFollowSticky] = useUserSettingStickyHeader()

  // しきい値ごとの結果だけを購読して、スクロールのたびに再描画しない
  const passed = useWindowScroll(
    ({ scrollY, innerWidth }) =>
      (scrollY > 0 ? SCROLLED : 0) |
      (scrollY > (innerWidth <= 800 ? 120 : 250) ? PAST_TITLE : 0) |
      (scrollY >= 250 ? PAST_TRPFROG : 0),
  )
  const visibleSubtitle = !isTopPage && (passed & PAST_TITLE) !== 0
  const visibleTrpFrog = !isTopPage || (passed & PAST_TRPFROG) !== 0
  const visibleShadow = (passed & SCROLLED) !== 0

  return {
    // ヘッダーを表示するかどうか
    visible,

    // ヘッダーを viewport 上部に固定するかどうか
    sticky: isMobileMenuOpened || userSettingFollowSticky,

    // ヘッダーのサブタイトルを表示するかどうか
    visibleSubtitle,

    // ヘッダーのつまみアイコンを表示するかどうか
    visibleTrpFrog,

    // ヘッダーの影を表示するかどうか
    visibleShadow,
  }
}
