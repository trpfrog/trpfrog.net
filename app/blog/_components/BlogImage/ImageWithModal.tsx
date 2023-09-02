'use client'

import React, { CSSProperties, useState } from 'react'
import Modal from 'react-modal'
import CldImageWrapper from '@/components/utils/CldImageWrapper'
import styles from '@blog/_components/BlogImage/index.module.scss'
import { getPureCloudinaryPath } from '@blog/_lib/getPureCloudinaryPath'

export default function ImageWithModal(props: {
  src: string
  alt?: string
  publicId?: string
  width: number
  height: number
}) {
  const srcPath = getPureCloudinaryPath(props.src)
  const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`
  const modalStyle = {
    overlay: {
      position: 'fixed',
      background: 'rgba(0,0,0,.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    } as CSSProperties,
    content: {
      position: 'static',
      width: `min(calc(80vh * ${props.width / props.height}), 95vw)`,
      height: `min(calc(95vw * ${props.height / props.width}), 80vh)`,
      padding: 0,
      background: 'transparent',
      border: 'none',
      zIndex: 10,
    } as CSSProperties,
  }

  const [modalState, setModalState] = useState(false)

  const ImageOnArticle = () => (
    <CldImageWrapper
      src={props.publicId ?? srcPath.slice(1)}
      alt={props.alt || props.src}
      className={`rich_image ${styles.image}`}
      width={props.width}
      height={props.height}
      quality={50}
      placeholder="blur"
      blurDataURL={blurPath}
      onClick={() => setModalState(true)}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  )

  const ImageOnModal = () => (
    <CldImageWrapper
      src={props.publicId ?? srcPath.slice(1)}
      alt={props.alt || props.src}
      className={`rich_image`}
      width={props.width}
      height={props.height}
      placeholder="blur"
      blurDataURL={blurPath}
      sizes="100vw" // Support responsive
    />
  )

  return (
    <>
      <ImageOnArticle />
      <Modal
        isOpen={modalState}
        style={modalStyle}
        onRequestClose={() => setModalState(false)}
      >
        <ImageOnModal />
      </Modal>
    </>
  )
}
