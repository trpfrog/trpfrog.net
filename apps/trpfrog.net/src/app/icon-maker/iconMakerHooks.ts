import { RefObject, useMemo, useState } from 'react'

import { IconCanvas } from '@/app/icon-maker/iconMaker'

import styles from '@/app/icon-maker/style.module.css'

export function useIconCanvas(imgRef: RefObject<HTMLCanvasElement | null>) {
  const [iconCanvas] = useState(() => new IconCanvas(imgRef))
  return iconCanvas
}

export function useIconMakerController(iconCanvas: IconCanvas) {
  return useMemo(
    () =>
      [
        {
          className: styles.plus_btn,
          onClick: () => iconCanvas.scaleImage(1.05),
          text: '+',
        },
        {
          className: styles.minus_btn,
          onClick: () => iconCanvas.scaleImage(1 / 1.05),
          text: '-',
        },
        {
          className: styles.left_btn,
          onClick: () => iconCanvas.moveImage(-5, 0),
          text: '←',
        },
        {
          className: styles.down_btn,
          onClick: () => iconCanvas.moveImage(0, 5),
          text: '↓',
        },
        {
          className: styles.up_btn,
          onClick: () => iconCanvas.moveImage(0, -5),
          text: '↑',
        },
        {
          className: styles.right_btn,
          onClick: () => iconCanvas.moveImage(5, 0),
          text: '→',
        },
        {
          className: styles.rotate_left_btn,
          onClick: () => iconCanvas.rotateImage(-5),
          text: '←R',
        },
        {
          className: styles.rotate_right_btn,
          onClick: () => iconCanvas.rotateImage(5),
          text: 'R→',
        },
        {
          className: styles.apply_btn,
          onClick: () => iconCanvas.writeImage(),
          text: '描画',
        },
      ] satisfies {
        className: string
        onClick: () => void
        text: string
      }[],
    [iconCanvas],
  )
}
