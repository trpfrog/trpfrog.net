// tailwind-variants definition
import { useMobileMenuState, useToggleMenuCallback } from '@/components/organisms/MobileMenu'

import { tv } from '@/lib/tailwind/variants'

const createHamburgerStyles = tv({
  slots: {
    button: [
      'tw-relative tw-w-7 tw-h-6 tw-z-[199] tw-cursor-pointer',
      '*:tw-transition-all *:tw-duration-500',
    ],
    span1: 'tw-absolute tw-left-0 tw-w-full tw-h-1 tw-bg-white tw-rounded',
    span2: 'tw-absolute tw-left-0 tw-w-full tw-h-1 tw-bg-white tw-rounded',
    span3: 'tw-absolute tw-left-0 tw-w-full tw-h-1 tw-bg-white tw-rounded',
  },
  variants: {
    isOpened: {
      false: {
        span1: 'tw-top-0 tw-w-full',
        span2: 'tw-top-[calc(50%-2px)] tw-w-full',
        span3: 'tw-bottom-0 tw-w-full',
      },
      true: {
        span1: 'tw-top-0 tw-w-[43%] tw-translate-x-[1.5px] tw-translate-y-[3.6px] tw-rotate-45',
        span2: 'tw-top-[10px] tw-w-[105%] tw-translate-x-[-1px] tw-rotate-[-45deg]',
        span3: 'tw-bottom-0 tw-w-[43%] tw-translate-x-[14px] tw-translate-y-[-3.5px] tw-rotate-45',
      },
    },
  },
})

export function Hamburger(props: { ref: React.RefObject<HTMLDivElement | null> }) {
  const [isOpened] = useMobileMenuState()
  const toggleMenuCallback = useToggleMenuCallback()
  const hamburgerStyles = createHamburgerStyles({ isOpened })
  return (
    <div
      className="tw-inline-grid tw-place-items-center tw-transition-all tw-duration-500"
      ref={props.ref}
    >
      <button
        className={hamburgerStyles.button()}
        onClick={toggleMenuCallback}
        aria-label={isOpened ? 'メニューを閉じる' : 'メニューを開く'}
      >
        <span className={hamburgerStyles.span1()} />
        <span className={hamburgerStyles.span2()} />
        <span className={hamburgerStyles.span3()} />
      </button>
    </div>
  )
}
