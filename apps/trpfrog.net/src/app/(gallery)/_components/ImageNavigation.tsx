import * as React from 'react'

import Image from 'next/legacy/image'
import Link from 'next/link'

import { RichButton } from '@/components/atoms/RichButton'

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
    <div className="tw:flex tw:items-center tw:justify-center tw:gap-2">
      <RichButton as={Link} href={props.prevHref}>
        &larr;
      </RichButton>
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
      <RichButton as={Link} href={props.nextHref}>
        &rarr;
      </RichButton>
    </div>
  )
}
