import { tv } from 'tailwind-variants'

import { PlainBlock, PlainBlockProps } from '@/components/atoms/PlainBlock'

const style = tv({
  base: 'tw-h-full tw-w-full tw-rounded-xl tw-border-2 tw-border-window-color',
})

export function TopCard(props: PlainBlockProps) {
  const { className, ...rest } = props
  return <PlainBlock className={style({ className })} {...rest} />
}
