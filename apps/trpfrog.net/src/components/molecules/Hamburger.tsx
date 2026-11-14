import { PopoverTrigger } from '@ui-sdk/react/popover'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    wrapper: 'tw:inline-grid tw:place-items-center',
    button: [
      'tw:group tw:relative tw:w-7 tw:h-6 tw:z-199 tw:cursor-pointer',
      'tw:*:transition-all tw:*:duration-500',
      'tw:*:absolute tw:*:left-0 tw:*:h-1 tw:*:w-full tw:*:bg-white tw:*:rounded-xs',
    ],
    line1: [
      'tw:top-0',
      'tw:group-data-open:w-[43%] tw:group-data-open:translate-x-[1.5px]',
      'tw:group-data-open:translate-y-[3.6px] tw:group-data-open:rotate-45',
    ],
    line2: [
      'tw:top-[calc(50%-2px)]',
      'tw:group-data-open:top-2.5 tw:group-data-open:w-[105%]',
      'tw:group-data-open:-translate-x-px tw:group-data-open:-rotate-45',
    ],
    line3: [
      'tw:bottom-0',
      'tw:group-data-open:w-[43%] tw:group-data-open:translate-x-3.5',
      'tw:group-data-open:translate-y-[-3.5px] tw:group-data-open:rotate-45',
    ],
  },
})()

export function Hamburger() {
  return (
    <div className={styles.wrapper()}>
      <PopoverTrigger className={styles.button()} aria-label="メニュー">
        <span className={styles.line1()} />
        <span className={styles.line2()} />
        <span className={styles.line3()} />
      </PopoverTrigger>
    </div>
  )
}
