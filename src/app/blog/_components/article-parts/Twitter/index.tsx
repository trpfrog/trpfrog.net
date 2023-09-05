import React from 'react'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'

import { Tweet } from './TwitterWrapper'

export const Twitter: IsomorphicArticleParts = React.memo(
  function InnerTwitter({ content }) {
    const id = content.split('\n')[0]
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 'min(550px, 100%)', display: 'inline-block' }}>
            <div className={'only-on-light-mode'}>
              <Tweet tweetId={id} options={{ theme: 'light' }} />
            </div>
            <div className={'only-on-dark-mode'}>
              <Tweet tweetId={id} options={{ theme: 'dark' }} />
            </div>
          </div>
        </div>
      </>
    )
  },
)
