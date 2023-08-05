import {ArticleParts} from "@blog/_components/ArticleParts";
import React from "react";
import {Tweet} from "react-twitter-widgets";

export const Twitter: ArticleParts = React.memo(function InnerTwitter({content}) {
  const id = content.split('\n')[0]
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <div style={{width: 'min(550px, 100%)', display: 'inline-block'}}>
          <div className={'only-on-light-mode'}>
            <Tweet tweetId={id} options={{theme: 'light'}}/>
          </div>
          <div className={'only-on-dark-mode'}>
            <Tweet tweetId={id} options={{theme: 'dark'}}/>
          </div>
        </div>
      </div>
    </>
  )
})
