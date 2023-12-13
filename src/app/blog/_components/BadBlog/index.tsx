'use client'
import { useContext, useState } from 'react'
import * as React from 'react'

import { Button } from '@/components/atoms/Button'

import styles from './index.module.scss'

export const BadBlogStateContext = React.createContext({
  badBlog: 0,
  setBadBlog: (() => {}) as any,
  badButtonFlag: false,
  setBadButtonFlag: (() => {}) as any,
})

export function BadBlogStateProvider(props: { children: React.ReactNode }) {
  const [badBlog, setBadBlog] = useState(0)
  const [badButtonFlag, setBadButtonFlag] = useState(false)
  return (
    <BadBlogStateContext.Provider
      value={{
        badBlog,
        setBadBlog,
        badButtonFlag,
        setBadButtonFlag,
      }}
    >
      {props.children}
    </BadBlogStateContext.Provider>
  )
}

export function BadBlogButton() {
  const badBlogs = [
    'ebioishii_u',
    'コントラストがカス',
    '赤が色褪せている',
    '画像が散らかっている',
    'ぐるぐる',
  ]

  const { badBlog, setBadBlog, badButtonFlag, setBadButtonFlag } =
    useContext(BadBlogStateContext)

  const handleBadBlog = () => {
    setBadButtonFlag(true)
    if (badBlog) {
      setBadBlog(0)
    } else {
      setBadBlog(Math.ceil(Math.random() * badBlogs.length))
    }
  }

  return (
    <div>
      <p style={badButtonFlag ? {} : { opacity: 0.05, height: 2, margin: 0 }}>
        <Button onClick={handleBadBlog}>
          {badBlog ? '元に戻す' : 'よくないブログ'}
        </Button>
      </p>
      {badBlog > 0 && (
        <p>
          よくないブログ No.{badBlog}: <b>{badBlogs[badBlog - 1]}</b>
        </p>
      )}
    </div>
  )
}

export function BadBlogBlock({ children }: { children: React.ReactNode }) {
  const { badBlog } = useContext(BadBlogStateContext)
  return (
    <div className={styles.bad_blog_wrapper} data-bad-blog={badBlog}>
      {children}
    </div>
  )
}
