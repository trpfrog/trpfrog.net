import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useMotionValueEvent, useScroll } from 'motion/react'

import { useIsMobileMenuOpened } from '@/components/organisms/MobileMenu'
import { useWindowScroll } from '@/hooks/useWindowScroll'
import {
  useUserSettingAlwaysVisibleHeader,
  useUserSettingStickyHeader,
} from '@/states/userSettings'

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

  // 描画のたびに登録すると購読が溜まっていくので、解除まで面倒を見てくれるフックで購読する
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

  const systemSideSettingAlwaysVisible = useAtomValue(alwaysShowHeaderAtom)
  const [userSettingAlwaysVisible] = useUserSettingAlwaysVisibleHeader()

  const isMobileMenuOpened = useIsMobileMenuOpened()
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
  const isTopPage = usePathname() === '/'

  const visible = useHeaderVisibleStatus()

  const isMobileMenuOpened = useIsMobileMenuOpened()
  const [userSettingFollowSticky] = useUserSettingStickyHeader()

  // スクロールのたびに再描画しないよう、しきい値を超えたかどうかだけを購読する
  const visibleSubtitle = useWindowScroll(
    ({ scrollY, innerWidth }) => !isTopPage && scrollY > (innerWidth <= 800 ? 120 : 250),
  )
  const visibleTrpFrog = useWindowScroll(({ scrollY }) => !isTopPage || scrollY >= 250)
  const visibleShadow = useWindowScroll(({ scrollY }) => scrollY > 0)

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
