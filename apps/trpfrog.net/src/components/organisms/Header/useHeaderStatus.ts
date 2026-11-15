import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

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

  // 速く上へスクロールしたら出し、速く下へスクロールしたら隠す。
  // 速さは直前の scroll イベントからの移動量を経過時間で割って求める (px/ms)
  useEffect(() => {
    let lastY = window.scrollY
    let lastTime = performance.now()
    const onScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      // 時刻が進んでいなければ 0 で割ることになるので、速さは 0 とみなす
      const v = now > lastTime ? (y - lastY) / (now - lastTime) : 0
      lastY = y
      lastTime = now
      if (y < 500 || v < -1) {
        setShowHeader(true)
      } else if (v > 1) {
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
