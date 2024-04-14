import * as React from 'react'

import { InlineLink } from '@/components/atoms/InlineLink'
import { Tweet } from '@/components/utils/TweetWrapper'

import { ArticleParts } from '@blog/_components/ArticleParts'

export const twitterParts = {
  name: 'twitter',
  Component: React.memo(function InnerTwitter({ content }) {
    const id = content.split('\n')[0]

    const tweet = (
      <Tweet
        id={id}
        fallback={
          <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
            <b>Tweet not found</b>
            <br />
            <small>
              id ={' '}
              <InlineLink href={`https://twitter.com/trpfrog/status/${id}`}>
                {id}
              </InlineLink>
            </small>
          </p>
        }
      />
    )

    return (
      <>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div
            style={{
              width: 'min(550px, 100%)',
            }}
          >
            <div className="dark:tw-hidden" data-theme="light">
              {tweet}
            </div>
            <div className="tw-hidden dark:tw-block" data-theme="dark">
              {tweet}
            </div>
          </div>
        </div>
      </>
    )
  }),
} as const satisfies ArticleParts
