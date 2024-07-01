import { ReactNode } from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { useMobileMenuState, useToggleMenuCallback } from '@/components/organisms/MobileMenu/hooks'

import { tv } from '@/lib/tailwind/variants'

const createStyles = tv({
  slots: {
    wrapper: 'tw-fixed tw-inset-0 tw-z-[150] tw-flex ' + 'tw-pt-[--header-height] tw-align-bottom',
    background: 'tw-absolute tw-inset-0 tw-z-[150] tw-bg-black tw-duration-300',
    menuWrapper: 'tw-z-[151] tw-my-0 tw-flex tw-flex-row-reverse tw-duration-300',
  },
  variants: {
    opened: {
      true: {
        background: 'tw-opacity-70',
      },
      false: {
        wrapper: 'tw-pointer-events-none',
        background: '-tw-z-10 tw-opacity-0',
        menuWrapper: '-tw-translate-y-[150%]',
      },
    },
  },
})

interface MobileMenuBkgProps {
  children: ReactNode
}

export function MobileMenuBkg(props: MobileMenuBkgProps) {
  const doNothing = () => {}
  const toggleMenu = useToggleMenuCallback()
  const [isOpened] = useMobileMenuState()

  const styles = createStyles({ opened: isOpened })

  return (
    <section className={styles.wrapper()}>
      <aside className={styles.background()} onClick={isOpened ? toggleMenu : doNothing} />
      <MainWrapper className={styles.menuWrapper()}>{props.children}</MainWrapper>
    </section>
  )
}
