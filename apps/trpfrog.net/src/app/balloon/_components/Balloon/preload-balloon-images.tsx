import { preload } from 'react-dom'

import {
  brokenBalloonImagePath,
  normalBalloonImagePaths,
  trembleBalloonImagePaths,
} from './constants'

const balloonImagePaths = [
  ...normalBalloonImagePaths,
  ...trembleBalloonImagePaths,
  brokenBalloonImagePath,
]

/** 割れる瞬間に画像の読み込みを待たないよう、風船の画像を先に読み込ませる */
export function PreloadBalloonImages() {
  for (const path of balloonImagePaths) preload(path, { as: 'image' })
  return null
}
