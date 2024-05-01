import * as React from 'react'

import Image from 'next/legacy/image'

import { H4 } from '@/components/wrappers'

import styles from './style.module.scss'

type Props = {
  name: string
  imagePath?: string
  children?: React.ReactNode
}

export const GadgetIntro: React.FunctionComponent<Props> = ({
  children,
  name,
  imagePath,
}) => {
  let imageHtml: JSX.Element = <></>
  if (imagePath !== undefined) {
    imageHtml = (
      <div className={styles.gadget_image_wrapper}>
        <Image
          src={'environment/' + imagePath}
          alt={name + 'の画像'}
          width={800}
          height={600}
          className={styles.image}
          objectFit={'cover'}
        />
      </div>
    )
  }
  return (
    <>
      <H4 className={styles.name}>{name}</H4>
      {imageHtml}
      {children}
    </>
  )
}
