'use client'
import Image, { ImageProps } from 'next/image'

import type { Except } from 'type-fest'

import { cloudinaryLoader } from '@/lib/cloudinaryUtils'

export function CldImageWrapper(props: Except<ImageProps, 'loader'>) {
  return <Image {...props} loader={cloudinaryLoader} />
}
