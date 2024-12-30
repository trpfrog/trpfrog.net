import { services } from '@trpfrog.net/constants'
import { atomWithStorage } from 'jotai/utils'

import { clientEnv } from '@/clientEnv'

export const initialValues = {
  websiteOrigin: services.website.origin(clientEnv.NODE_ENV),
  contentServerOrigin: services.contentServer.origin(clientEnv.NODE_ENV),
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
