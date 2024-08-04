'use client'

import { Image } from '@/components/atoms/Image'

export function ImageWithModal(props: {
  src: string
  alt?: string
  publicId?: string
  spoiler?: boolean
}) {
  const searchParams = new URLSearchParams(props.src.split('?')[1])
  const width = parseInt(searchParams.get('w') ?? '', 10) || 1000
  const height = parseInt(searchParams.get('h') ?? '', 10) || 750

  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={width}
      height={height}
      withSpoiler={props.spoiler}
    />
  )
}
