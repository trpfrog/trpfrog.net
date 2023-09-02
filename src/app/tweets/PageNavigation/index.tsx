'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import styles from './index.module.scss'

function Button(props: { pageNo: number; text?: string; current?: boolean }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams ?? {})
  params.set('p', props.pageNo + '')
  return (
    <button
      onClick={() => {
        location.href = `/tweets?${params.toString()}#tweets`
      }}
      className={styles.button}
      data-current={props.current}
    >
      {props.text ?? props.pageNo}
    </button>
  )
}

export default function PageNavigation(props: {
  currentPage: number
  lastPage: number
  numTweets: number
  key: string
}) {
  if (props.numTweets === 0) {
    return <></>
  }

  // create array like [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, ..., lastPage]
  let buttons: number[] = []

  if (props.lastPage < 10) {
    buttons = [...Array(props.lastPage).keys()].map(e => e + 1)
  } else {
    let dx = 1
    for (let i = props.currentPage; i <= props.lastPage; i += dx, dx *= 2) {
      buttons.push(i)
    }
    dx = 1
    for (let i = props.currentPage; 1 <= i; i -= dx, dx *= 2) {
      buttons.push(i)
    }
    buttons.push(1)
    buttons.push(props.lastPage)

    buttons.push(
      ...[
        props.currentPage - 2,
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        props.currentPage + 2,
      ].filter(e => 1 <= e && e <= props.lastPage),
    )

    buttons = [...new Set(buttons)].sort((a, b) => a - b)
  }

  const tweetRemains =
    props.currentPage === props.lastPage ? props.numTweets % 50 : 50

  return (
    <div className={styles.navigation}>
      <span style={{ display: 'inline-block' }}>
        {props.numTweets} ツイート中 {tweetRemains} 件を表示
      </span>{' '}
      <span style={{ display: 'inline-block' }}>
        ({props.currentPage} / {props.lastPage} ページ目)
      </span>
      <div className={styles.button_wrapper}>
        {buttons.map(pageNo => (
          <React.Fragment key={`navigation-${pageNo}-${props.key}`}>
            <Button pageNo={pageNo} current={pageNo === props.currentPage} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
