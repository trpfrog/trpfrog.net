import { PopoverArrow, PopoverContent, PopoverTitle } from '@ui-sdk/react/popover'

import { Details } from '@/components/atoms/Details'
import { RichButton } from '@/components/atoms/RichButton'
import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'
import { tv } from '@/lib/tailwind'

import { useIsMobileMenuOpened, useSetMobileMenuOpened } from './hooks'
import { Settings } from './Settings'

const styles = tv({
  slots: {
    overlay: [
      'tw:pointer-events-none tw:fixed tw:inset-0 tw:z-150 tw:bg-black',
      'tw:opacity-0 tw:transition-opacity tw:duration-300',
      'tw:data-open:opacity-70',
    ],
    content: [
      'tw:flex tw:flex-col tw:gap-3 tw:p-4',
      'tw:bg-window-color tw:rounded-lg',
      'tw:sp:w-(--available-width)',
      'tw:transition-[opacity,translate] tw:duration-300',
      'tw:data-starting-style:-translate-y-4 tw:data-starting-style:opacity-0',
      'tw:data-ending-style:-translate-y-4 tw:data-ending-style:opacity-0',
      'tw:motion-reduce:translate-y-0!',
      'tw:print:hidden',
    ],
    arrow: 'tw:-top-2 tw:size-4 tw:rotate-45 tw:bg-window-color tw:sp:hidden',
    links: 'tw:grid tw:grid-cols-2 tw:gap-x-2 tw:gap-y-2.5',
  },
})()

export function MobileMenu() {
  const isOpened = useIsMobileMenuOpened()
  const setOpened = useSetMobileMenuOpened()
  return (
    <>
      <div aria-hidden className={styles.overlay()} data-open={isOpened || undefined} />
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={14}
        collisionPadding={8}
        className={styles.content()}
      >
        <PopoverArrow className={styles.arrow()} />
        <PopoverTitle className="tw:sr-only">メニュー</PopoverTitle>
        <nav className={styles.links()}>
          {NAVIGATION_LINKS.map(({ link, name }) => (
            <RichButton href={link} key={link} onClick={() => setOpened(false)}>
              {name}
            </RichButton>
          ))}
        </nav>
        <Details summary="高度な設定">
          <Settings />
        </Details>
      </PopoverContent>
    </>
  )
}
