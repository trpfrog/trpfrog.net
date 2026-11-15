import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { createVelocityTracker } from '@ui-sdk/core/gesture'

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
  const [showHeader, setShowHeader] = useState(true)

  // 速く上へスクロールしたら出し、速く下へスクロールしたら隠す。速さの単位は px/ms
  useEffect(() => {
    const tracker = createVelocityTracker()
    let lastY = window.scrollY
    const onScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      tracker.add(now, y)
      // 推定した速さは、急に減速すると逆向きに振れることがある。
      // 直前のスクロールと向きがそろうときだけ使う
      const v = tracker.velocity(now)
      if (y < 500 || (v < -1 && dy < 0)) {
        setShowHeader(true)
      } else if (v > 1 && dy > 0) {
        setShowHeader(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
