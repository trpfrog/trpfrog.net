import * as React from 'react'

import Image from 'next/legacy/image'

import { MagicButton } from '@/components/atoms/MagicButton'

type ImageNavigationProps = {
  icons: {
    key: React.Key
    src: string
    alt: string
  }[]
  nextHref: string
  prevHref: string
}

export function ImageNavigation(props: ImageNavigationProps) {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
      <MagicButton href={props.prevHref}>&larr;</MagicButton>
      {props.icons.map(nav => {
        return (
          <Image
            key={nav.key}
            src={nav.src}
            width={100}
            height={100}
            objectFit={'contain'}
            quality={50}
            alt={nav.alt}
          />
        )
      })}
      <MagicButton href={props.nextHref}>&rarr;</MagicButton>
    </div>
  )
}
