import dataUrl from '../../../skills/tsmami-image/assets/tsmami-reference.png?inline'

const PREFIX = 'data:image/png;base64,'

if (!dataUrl.startsWith(PREFIX)) {
  throw new Error('The reference image must be bundled as a base64 PNG data URL')
}

/** 配布用スキルに同梱した参照画像。Vite がバンドルに data URL として埋め込む。 */
export const tsmamiReferenceImageBase64 = dataUrl.slice(PREFIX.length)
