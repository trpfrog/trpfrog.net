import { atomWithStorage } from 'jotai/utils'

import { services } from '@trpfrog.net/constants'

export const initialValues = {
  // portless を通さずに起動したときは開発時の origin が決まらない。
  // 本番に書き込まないよう空にしておき、画面から入力してもらう
  websiteOrigin: services.website.origin(process.env.NODE_ENV) ?? '',
  contentServerOrigin: services.contentServer.origin(process.env.NODE_ENV) ?? '',
  imageGenerationOrigin: services.imageGeneration.production,
}

export const websiteOriginAtom = atomWithStorage<string>(
  'website-origin',
  initialValues.websiteOrigin,
)
export const contentServerOriginAtom = atomWithStorage<string>(
  'content-server-origin',
  initialValues.contentServerOrigin,
)
export const imageGenerationOriginAtom = atomWithStorage<string>(
  'image-generation-origin',
  initialValues.imageGenerationOrigin,
)
