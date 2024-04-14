import * as React from 'react'

import { z } from 'zod'

import { ErrorFallback } from '@/components/atoms/ErrorFallback'
import {
  TwitterArchived,
  TwitterArchivedProps,
} from '@/components/organisms/TwitterArchived'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { parseColonSeparatedDict } from '@blog/_lib/rawTextParser'

import { generateTwitterArchiveProps } from './generateTwitterArchiveProps'

import { env } from '@/env/server'


function Fallback(props: { content: string; error: z.ZodError }) {
  if (env.NODE_ENV === 'development') {
    return (
      <ErrorFallback title={'TwitterArchive: Error Occurred'}>
        {props.error.message}
      </ErrorFallback>
    )
  } else {
    console.error('\n```twitter-archived')
    console.error(props.content.trim())
    console.error('```\n')
    throw props.error
  }
}

export const twitterArchiveParts = {
  name: 'twitter-archived',
  Component: React.memo(function TwitterArchive({ content }) {
    const rawTweetData = parseColonSeparatedDict(content)
    let props: TwitterArchivedProps
    try {
      props = generateTwitterArchiveProps(rawTweetData)
    } catch (error) {
      return <Fallback content={content} error={error as z.ZodError} />
    }
    return <TwitterArchived {...props} />
  }),
} as const satisfies ArticleParts
