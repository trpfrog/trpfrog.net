import { Suspense } from 'react'

import { usePathname } from 'next/navigation'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { KawaiiLogo } from '@/components/organisms/Header/KawaiiLogo'
import { SiteNameWithIcon } from '@/components/organisms/Header/SiteNameWithIcon'
import { useHeaderStatus } from '@/components/organisms/Header/useHeaderStatus'
import { MobileMenu, MobileMenuTrigger } from '@/components/organisms/MobileMenu'
import { tv } from '@/lib/tailwind'
import { useIsKawaiiLogo } from '@/states/userSettings'

import { HeaderNav } from './HeaderNav'

// 見た目は wrapper の data-sticky / data-hidden と、header の data-scrolled で切り替える
const styles = tv({
  slots: {
    wrapper: [
      'tw:z-999 tw:h-(--header-height) tw:w-full tw:ease-out',
      'tw:data-sticky:sticky tw:data-sticky:top-0 tw:print:static',
      'tw:data-sticky:not-data-hidden:duration-200',
      'tw:data-hidden:-translate-y-full tw:data-hidden:duration-100',
    ],
    header: 'tw:h-full tw:overflow-clip tw:bg-header-color tw:data-scrolled:shadow-md',
    inside: 'tw:relative tw:flex tw:h-full tw:items-center tw:justify-between',
    // MobileMenu を出す位置の目印。PC の幅とはみ出しは、目印の中央に来る
    // 吹き出しの矢印がハンバーガーの真下に来るように決めている
    menuAnchor: [
      'tw:pointer-events-none tw:absolute tw:top-full tw:right-0 tw:h-0 tw:w-full tw:mt-2',
      'tw:pc:-right-[17.5px] tw:pc:mt-8 tw:pc:w-[68px]',
    ],
    nav_wrapper: 'tw:flex',
  },
})()

type Props = {
  title?: React.ReactNode
}

function InternalHeader(props: {
  kawaii?: boolean
  sticky?: boolean
  visible?: boolean
  visibleShadow?: boolean
  visibleTrpFrog?: boolean
  visibleSubtitle?: boolean
  pathname?: string
}) {
  const {
    kawaii = false,
    sticky = false,
    visible = false,
    visibleShadow = false,
    visibleTrpFrog = false,
    visibleSubtitle = false,
    pathname = '/',
  } = props
  return (
    <>
      <div
        className={styles.wrapper()}
        data-sticky={sticky || undefined}
        data-hidden={(sticky && !visible) || undefined}
      >
        <header className={styles.header()} data-scrolled={(sticky && visibleShadow) || undefined}>
          <MainWrapper className={styles.inside()} style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="tw:w-fit">
              {kawaii ? (
                <KawaiiLogo />
              ) : (
                <SiteNameWithIcon
                  visibleSubtitle={visibleSubtitle}
                  visibleTrpFrog={visibleTrpFrog}
                  pathname={pathname}
                />
              )}
            </div>
            <div className={styles.nav_wrapper()}>
              <HeaderNav />
              <MobileMenuTrigger />
            </div>
            <div aria-hidden data-mobile-menu-anchor className={styles.menuAnchor()} />
          </MainWrapper>
        </header>
      </div>
      <MobileMenu />
    </>
  )
}

function ClientHeader() {
  const kawaii = useIsKawaiiLogo()
  const { sticky, visible, visibleShadow, visibleTrpFrog, visibleSubtitle } = useHeaderStatus()
  const pathname = usePathname() ?? '/'
  return (
    <InternalHeader
      kawaii={kawaii}
      sticky={sticky}
      visible={visible}
      visibleShadow={visibleShadow}
      visibleTrpFrog={visibleTrpFrog}
      visibleSubtitle={visibleSubtitle}
      pathname={pathname}
    />
  )
}

export function Header(_props: Props) {
  return (
    // useIsKawaiiLogo reads search params, which needs a Suspense boundary
    <Suspense
      fallback={<InternalHeader visible sticky visibleShadow visibleTrpFrog visibleSubtitle />}
    >
      <ClientHeader />
    </Suspense>
  )
}
