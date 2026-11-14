'use client'

import { useCallback } from 'react'

import { useSearchParams } from 'next/navigation'

import { PageNavigation as SharedPageNavigation } from '@/components/organisms/PageNavigation'

import styles from './index.module.css'

export function PageNavigation(props: {
  currentPage: number
  lastPage: number
  numTweets: number
}) {
  const searchParams = useSearchParams()
  const createPath = useCallback(
    (pageNo: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('p', String(pageNo))
      return `/tweets?${params.toString()}#tweets`
    },
    [searchParams],
  )

  if (props.numTweets === 0) {
    return null
  }

  const tweetRemains = props.currentPage === props.lastPage ? props.numTweets % 50 : 50

  return (
    <div className={styles.navigation}>
      <span className="tw:inline-block">
        {props.numTweets} ツイート中 {tweetRemains} 件を表示
      </span>{' '}
      <span className="tw:inline-block">
        ({props.currentPage} / {props.lastPage} ページ目)
      </span>
      <SharedPageNavigation
        currentPage={props.currentPage}
        lastPage={props.lastPage}
        createPath={createPath}
        className="tw:mt-2.5"
      />
    </div>
  )
}
