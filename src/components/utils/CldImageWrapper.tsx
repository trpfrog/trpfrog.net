'use client'
import Image, { ImageProps } from 'next/image'

import { cloudinaryLoader } from '@blog/_lib/cloudinaryUtils'

export function CldImageWrapper(props: Omit<ImageProps, 'loader'>) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} loader={cloudinaryLoader} />
}
