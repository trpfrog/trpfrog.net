'use client'
import React from 'react'

import { useShowSiteComments } from '@/states/showSiteComments'

export function Settings() {
  const [shouldShowSiteComments, setShouldShowSiteComments] =
    useShowSiteComments()
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={shouldShowSiteComments}
          onChange={e => setShouldShowSiteComments(e.target.checked)}
        />
        フィードバックを送信する
        <small>(Vercel のコメント機能が使えます)</small>
      </label>
    </div>
  )
}
