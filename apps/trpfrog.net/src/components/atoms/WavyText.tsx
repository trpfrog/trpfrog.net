import { CSSProperties } from 'react'

import { twMerge } from '@/lib/tailwind/merge'

export function WavyText(props: { text: string; className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-label={props.text}
      className={twMerge('*:tw-inline-block tw-tracking-wide', props.className)}
      style={props.style}
    >
      {props.text.split('').map((char, i) => (
        <span key={i} className={i % 2 !== 0 ? 'tw-rotate-3' : '-tw-rotate-3'}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
