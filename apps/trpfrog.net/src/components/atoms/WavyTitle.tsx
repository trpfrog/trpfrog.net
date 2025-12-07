import { CSSProperties } from 'react'

import { tv, twMerge } from '@/lib/tailwind'

import { WavyText } from './WavyText'

const wavyTextStyle = tv({
  base: [
    'tw:font-palanquin-dark tw:font-extrabold tw:leading-none',
    'tw:text-lime-600 tw:dark:text-lime-100 tw:text-5xl tw:sp:text-4xl',
  ],
})

export function WavyTitle(props: { text: string; className?: string; style?: CSSProperties }) {
  const style = wavyTextStyle()
  return (
    <h1 className={twMerge(style, props.className)} style={props.style}>
      <WavyText className="tw:tracking-[-0.01em]" text={props.text} />
    </h1>
  )
}
