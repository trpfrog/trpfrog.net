'use client';

import {Tweet} from "react-twitter-widgets";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import React from "react";
import {parseInlineMarkdown} from "../../../app/blog/renderer/BlogMarkdown";
import {ArticleParts} from "../ArticleParts";

export const Twitter: ArticleParts = (content) => {
  const id = content.split('\n')[0]
  const original = content.split('\n').slice(1)
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
}

export const Youtube: ArticleParts = (content) => {
  const lines = content.split('\n')
  const id = lines[0].trim()
  const title = lines[1]?.trim()
  return (
    <div style={{textAlign: 'center'}}>
      <YouTube
        videoId={id}
        className={'youtube-outer'}
        iframeClassName={'youtube-iframe'}
      />
    </div>
  )
}

export const AutoYoutube: ArticleParts = (content) => {
  const lines = content.split('\n')
  const id = lines[0].trim()
  const title = lines[1]?.trim()
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <ReactPlayer
        url={'https://www.youtube.com/watch?v=' + id}
        playing={true}
        volume={0}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              loop: 1,
              playlist: id  // it is needed to loop video
            }
          }
        }}
      />
    </div>
  )
}

export const LinkEmbed: ArticleParts = content => {
  const [url, ...captionArr] = content.split('\n')
  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <iframe
          style={{
            width: '100%',
            height: 150,
            maxWidth: 480
          }}
          src={`https://hatenablog-parts.com/embed?url=${
            encodeURIComponent(url.trim())
          }`}
          frameBorder="0"
          scrolling="no"
        />
      </div>
      {captionArr.length > 0 &&
        <div style={{opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25}}>
          <small>{parseInlineMarkdown(captionArr.join('\n').trim())}</small>
        </div>
      }
    </div>
  )
}
