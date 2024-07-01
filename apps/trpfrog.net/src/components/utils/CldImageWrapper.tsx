'use client'
import Image, { ImageProps } from 'next/image'

import { cloudinaryLoader } from '@/lib/cloudinaryUtils'

export function CldImageWrapper(props: Omit<ImageProps, 'loader'>) {
  return <Image {...props} loader={cloudinaryLoader} />
}
