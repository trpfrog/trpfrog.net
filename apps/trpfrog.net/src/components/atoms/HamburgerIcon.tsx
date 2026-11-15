import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    root: 'tw:relative tw:block tw:h-6 tw:w-7',
    line: 'tw:absolute tw:left-0 tw:h-1 tw:w-full tw:rounded-xs tw:bg-white tw:transition-all tw:duration-500',
  },
  variants: {
    open: {
      false: {},
      true: {},
    },
    position: {
      top: { line: 'tw:top-0' },
      middle: { line: 'tw:top-[calc(50%-2px)]' },
      bottom: { line: 'tw:bottom-0' },
    },
  },
  compoundVariants: [
    {
      open: true,
      position: 'top',
      class: { line: 'tw:w-[43%] tw:translate-x-[1.5px] tw:translate-y-[3.6px] tw:rotate-45' },
    },
    {
      open: true,
      position: 'middle',
      class: { line: 'tw:top-2.5 tw:w-[105%] tw:-translate-x-px tw:-rotate-45' },
    },
    {
      open: true,
      position: 'bottom',
      class: { line: 'tw:w-[43%] tw:translate-x-3.5 tw:translate-y-[-3.5px] tw:rotate-45' },
    },
  ],
})

/** 3 本線のメニューアイコン。open のときは × の形になる。飾りなので読み上げない */
export function HamburgerIcon(props: { open: boolean }) {
  const { root } = styles()
  return (
    <span aria-hidden className={root()}>
      {(['top', 'middle', 'bottom'] as const).map(position => (
        <span key={position} className={styles({ open: props.open, position }).line()} />
      ))}
    </span>
  )
}
