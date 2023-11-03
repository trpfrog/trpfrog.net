import React from 'react'

import { Tweet } from 'react-tweet'

import { ArticleParts } from '@blog/_components/ArticleParts'

export const twitterParts = {
  name: 'twitter',
  Component: React.memo(function InnerTwitter({ content }) {
    const id = content.split('\n')[0]
    return (
      <>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div
            style={{
              width: 'min(550px, 100%)',
            }}
          >
            <div className={'only-on-light-mode'} data-theme="light">
              <Tweet id={id} />
            </div>
            <div className={'only-on-dark-mode'} data-theme="dark">
              <Tweet id={id} />
            </div>
          </div>
        </div>
      </>
    )
  }),
} as const satisfies ArticleParts
