import { Suspense, useMemo, useRef } from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import { KawaiiLogoOrNot } from '@/components/organisms/Header/KawaiiLogo.tsx'
import { SiteNameWithIcon } from '@/components/organisms/Header/SiteNameWithIcon'
import { useHeaderStatus } from '@/components/organisms/Header/useHeaderStatus'
import { MobileMenu, useMobileMenuState } from '@/components/organisms/MobileMenu'

import { useFocusTrap } from '@/hooks/useFocusTrap'

import { tv } from '@/lib/tailwind/variants'

import { HeaderNav } from './HeaderNav'

const createStyles = tv({
  slots: {
    wrapper: 'tw-z-[999] tw-h-header tw-w-full tw-ease-out',
    header: 'tw-h-full tw-overflow-clip tw-bg-header-color',
    inside: 'tw-flex tw-h-full tw-items-center tw-justify-between',
    nav_wrapper: 'tw-flex',
  },
  variants: {
    sticky: {
      true: {
        wrapper: 'tw-sticky tw-top-0 print:tw-static',
      },
    },
    visible: { true: '' },
    scrolled: { true: '' },
  },
  compoundVariants: [
    {
      sticky: true,
      visible: true,
      class: {
        wrapper: 'tw-duration-200',
      },
    },
    {
      sticky: true,
      visible: false,
      class: {
        wrapper: 'tw-translate-y-[-100%] tw-duration-100',
      },
    },
    {
      sticky: true,
      scrolled: true,
      class: {
        header: 'tw-shadow-md',
      },
    },
  ],
})

type Props = {
  title?: React.ReactNode
}

// TODO: props を握りつぶさない
export function Header(_props: Props) {
  const { sticky, visible, visibleShadow } = useHeaderStatus()

  const refHeader = useRef<HTMLDivElement>(null)
  const refMobileMenu = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useMobileMenuState()

  const focusableRefs = [refHeader, refMobileMenu]
  useFocusTrap(focusableRefs, isOpened, () => setIsOpened(false))

  const styles = useMemo(
    () =>
      createStyles({
        sticky,
        visible,
        scrolled: visibleShadow,
      }),
    [sticky, visible, visibleShadow],
  )

  return (
    <div className={styles.wrapper()} ref={refHeader}>
      <header className={styles.header()}>
        <MainWrapper className={styles.inside()} style={{ marginTop: 0, marginBottom: 0 }}>
          <div className="tw-w-fit">
            {/* TODO: あまり賢い方法ではないのでどうにかする */}
            <Suspense fallback={<SiteNameWithIcon />}>
              <KawaiiLogoOrNot>
                <SiteNameWithIcon />
              </KawaiiLogoOrNot>
            </Suspense>
          </div>
          <div className={styles.nav_wrapper()}>
            <HeaderNav />
            <Hamburger />
          </div>
        </MainWrapper>
        <MobileMenu ref={refMobileMenu} isMenuOpened={isOpened} />
      </header>
    </div>
  )
}
