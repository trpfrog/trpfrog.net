import { Popover, PopoverArrow, PopoverContent, PopoverTitle } from '@ui-sdk/react/popover'

import { Details } from '@/components/atoms/Details'
import { RichButton } from '@/components/atoms/RichButton'
import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'
import { tv } from '@/lib/tailwind'

import { mobileMenuController } from './controller'
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
      'tw:flex tw:max-h-(--available-height) tw:flex-col',
      'tw:bg-window-color tw:rounded-lg',
      'tw:sp:w-(--anchor-width)',
      'tw:transition-[opacity,translate] tw:duration-300',
      'tw:data-starting-style:-translate-y-4 tw:data-starting-style:opacity-0',
      'tw:data-ending-style:-translate-y-4 tw:data-ending-style:opacity-0',
      'tw:motion-reduce:translate-y-0!',
      'tw:print:hidden',
    ],
    // 画面の低いスマホ (横向きなど) でも最後まで届くよう、収まらない分は中でスクロールさせる。
    // 矢印が切れないよう、スクロールは内側の要素に持たせる。ボタンの影が縁で切れないよう、
    // 余白もスクロールする側に持たせる
    body: 'tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:overflow-y-auto tw:overscroll-contain tw:p-4',
    // 吹き出しのしっぽ。ハンバーガーのすぐ下まで届く縦長の三角形
    arrow: [
      'tw:-top-9 tw:size-0 tw:border-[0.9rem] tw:border-b-[2rem]',
      'tw:border-transparent tw:border-b-window-color tw:sp:hidden',
    ],
    links: 'tw:grid tw:grid-cols-2 tw:gap-x-2 tw:gap-y-2.5',
  },
})()

export function MobileMenu() {
  const isOpened = useIsMobileMenuOpened()
  const setOpened = useSetMobileMenuOpened()
  return (
    <Popover controller={mobileMenuController} open={isOpened} onOpenChange={setOpened} modal>
      <div aria-hidden className={styles.overlay()} data-open={isOpened || undefined} />
      <PopoverContent
        // 位置はヘッダーに置いた目印で決める
        anchor="[data-mobile-menu-anchor]"
        side="bottom"
        align="end"
        sideOffset={0}
        collisionPadding={8}
        className={styles.content()}
      >
        <PopoverArrow className={styles.arrow()} />
        <PopoverTitle className="tw:sr-only">メニュー</PopoverTitle>
        <div className={styles.body()}>
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
        </div>
      </PopoverContent>
    </Popover>
  )
}
