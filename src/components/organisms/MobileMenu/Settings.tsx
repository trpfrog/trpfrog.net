'use client'
import React from 'react'

import { useShouldFollowHeaderAtom } from '@/states/shouldFollowHeaderAtom'
import { useShouldHideHeaderAtom } from '@/states/shouldHideHeaderAtom'
import { useShowSiteCommentsAtom } from '@/states/showSiteCommentsAtom'

function FeedbackServiceCheckbox() {
  const [shouldShowSiteComments, setShouldShowSiteComments] =
    useShowSiteCommentsAtom()
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={shouldShowSiteComments}
          onChange={e => setShouldShowSiteComments(e.target.checked)}
        />
        フィードバックを送信する
        <br />
        <small>(Vercel のコメント機能が使えます)</small>
      </label>
    </div>
  )
}

function HeaderCheckbox() {
  const [shouldFollowHeader, setShouldFollowHeader] =
    useShouldFollowHeaderAtom()
  const [shouldHideHeader, setShouldHideHeader] = useShouldHideHeaderAtom()

  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={shouldFollowHeader}
            onChange={e => setShouldFollowHeader(e.target.checked)}
          />
          ヘッダを追従させる
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={shouldHideHeader}
            disabled={!shouldFollowHeader}
            onChange={e => setShouldHideHeader(e.target.checked)}
          />
          スクロール時ヘッダを隠す
        </label>
      </div>
    </>
  )
}

export function Settings() {
  return (
    <div>
      <HeaderCheckbox />
      <FeedbackServiceCheckbox />
    </div>
  )
}
