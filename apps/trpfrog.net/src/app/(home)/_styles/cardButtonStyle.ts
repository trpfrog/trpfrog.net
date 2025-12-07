import { tv } from '@/lib/tailwind/variants'

export const cardButtonStyle = tv({
  base: [
    'tw:inline-flex tw:w-fit tw:flex-row tw:items-center tw:justify-center',
    'tw:rounded-full tw:px-3 tw:py-1',
    'tw:whitespace-nowrap tw:text-sm tw:font-bold',
    'tw:backdrop-blur',
  ],
  variants: {
    invertColor: {
      true: 'tw:bg-text-color/80 tw:text-window-color tw:hover:bg-text-color',
      false: 'tw:bg-window-color/80 tw:text-text-color tw:hover:bg-window-color',
    },
  },
  defaultVariants: {
    invertColor: false,
  },
})
