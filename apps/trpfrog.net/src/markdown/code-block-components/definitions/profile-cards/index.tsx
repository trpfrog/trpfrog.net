import { parseObjectList } from '@trpfrog.net/posts/parser'
import { safeValidateUnknown } from '@trpfrog.net/utils'

import { CustomCodeBlockComponent } from '../../types'

import { ProfileCards, ProfileDataSchema } from './ProfileCards'

export const profileCardsCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown, context }) => {
    const profileDataList = parseObjectList(markdown)
      .map(e => safeValidateUnknown(ProfileDataSchema, e))
      .filter(e => e.success)
      .map(e => e.output)

    return <ProfileCards profileDataList={profileDataList} held={context.blog?.held} />
  },
}
