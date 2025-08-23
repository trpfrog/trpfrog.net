'use client'
import Image, { ImageProps } from 'next/image'

import { cloudinaryLoader } from '@/lib/cloudinaryUtils'

import type { Except } from 'type-fest'

export function CldImageWrapper(props: Except<ImageProps, 'loader'>) {
  return <Image {...props} loader={cloudinaryLoader} />
}
