import { parseObjectList } from '@trpfrog.net/posts/parser'
import * as v from 'valibot'

import { CustomCodeBlockComponent } from '../../types'

import { ProfileCards, ProfileDataSchema } from './ProfileCards'

export const profileCardsCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown, context }) => {
    const profileDataList = parseObjectList(markdown)
      .map(e => v.safeParse(ProfileDataSchema, e))
      .filter(e => e.success)
      .map(e => e.output)

    return <ProfileCards profileDataList={profileDataList} held={context.blog?.held} />
  },
}
