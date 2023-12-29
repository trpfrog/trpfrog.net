'use client'
import { tv } from 'tailwind-variants'

import { Input } from '@/components/wrappers/Input'

import { useShouldFollowHeaderAtom } from '@/states/shouldFollowHeaderAtom'
import { useShouldHideHeaderAtom } from '@/states/shouldHideHeaderAtom'
import { useShowSiteCommentsAtom } from '@/states/showSiteCommentsAtom'

const styles = tv({
  slots: {
    settings: 'tw-flex tw-flex-col tw-gap-1',
    label: 'tw-flex tw-items-center tw-gap-1',
  },
})()

function FeedbackServiceCheckbox() {
  const [shouldShowSiteComments, setShouldShowSiteComments] =
    useShowSiteCommentsAtom()
  return (
    <div>
      <label className={styles.label()}>
        <Input
          type="checkbox"
          checked={shouldShowSiteComments}
          onChange={e => setShouldShowSiteComments(e.target.checked)}
        />
        <div className="tw-leading-[1]">
          フィードバックを送信する
          <br />
          <small>(Vercel のコメント機能が使えます)</small>
        </div>
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
        <label className={styles.label()}>
          <Input
            type="checkbox"
            checked={shouldFollowHeader}
            onChange={e => setShouldFollowHeader(e.target.checked)}
          />
          ヘッダを追従させる
        </label>
      </div>
      <div>
        <label className={styles.label()}>
          <Input
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
    <div className={styles.settings()}>
      <HeaderCheckbox />
      <FeedbackServiceCheckbox />
    </div>
  )
}
