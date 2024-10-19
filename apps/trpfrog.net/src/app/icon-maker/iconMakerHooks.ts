import { MutableRefObject, RefObject, useMemo, useRef } from 'react'

import { IconCanvas } from '@/app/icon-maker/iconMaker'
import styles from '@/app/icon-maker/style.module.scss'

export function useIconMakerRef(imgRef: RefObject<HTMLCanvasElement | null>) {
  const state = useRef<IconCanvas>(undefined)
  if (!state.current) {
    state.current = new IconCanvas(imgRef)
  }
  return state as MutableRefObject<IconCanvas>
}

export function useIconMakerController(state: MutableRefObject<IconCanvas>) {
  return useMemo(
    () =>
      [
        {
          className: styles.plus_btn,
          onClick: () => state.current?.scaleImage(1.05),
          text: '+',
        },
        {
          className: styles.minus_btn,
          onClick: () => state.current?.scaleImage(1 / 1.05),
          text: '-',
        },
        {
          className: styles.left_btn,
          onClick: () => state.current?.moveImage(-5, 0),
          text: '←',
        },
        {
          className: styles.down_btn,
          onClick: () => state.current?.moveImage(0, 5),
          text: '↓',
        },
        {
          className: styles.up_btn,
          onClick: () => state.current?.moveImage(0, -5),
          text: '↑',
        },
        {
          className: styles.right_btn,
          onClick: () => state.current?.moveImage(5, 0),
          text: '→',
        },
        {
          className: styles.rotate_left_btn,
          onClick: () => state.current?.rotateImage(-5),
          text: '←R',
        },
        {
          className: styles.rotate_right_btn,
          onClick: () => state.current?.rotateImage(5),
          text: 'R→',
        },
        {
          className: styles.apply_btn,
          onClick: () => state.current?.writeImage(),
          text: '描画',
        },
      ] satisfies {
        className: string
        onClick: () => void
        text: string
      }[],
    [state],
  )
}
