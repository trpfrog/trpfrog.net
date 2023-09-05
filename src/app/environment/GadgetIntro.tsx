import React from 'react'

import Image from 'next/legacy/image'

import styles from './style.module.scss'

type Props = {
  name: string
  imagePath?: string
  children?: React.ReactNode
}

const GadgetIntro: React.FunctionComponent<Props> = ({
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
      <h4 className={styles.name}>{name}</h4>
      {imageHtml}
      {children}
    </>
  )
}

export default GadgetIntro
