'use client'
import { Input } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

import { useKawaiiLogoAtom } from '@/states/kawaiiLogoAtom.ts'
import { useUserSettingStickyHeader } from '@/states/shouldFollowHeaderAtom'
import { useUserSettingAlwaysVisibleHeader } from '@/states/shouldHideHeaderAtom'

const styles = tv({
  slots: {
    settings: 'tw-flex tw-flex-col tw-gap-1',
    label: 'tw-flex tw-items-center tw-gap-1',
  },
})()

function KawaiiCheckbox() {
  const [showKawaiiLogo, setShowKawaiiLogo] = useKawaiiLogoAtom()
  return (
    <div>
      <label className={styles.label()}>
        <Input
          type="checkbox"
          checked={showKawaiiLogo}
          onChange={e => setShowKawaiiLogo(e.target.checked)}
        />
        <div className="tw-leading-[1]">
          かわいいロゴモード
          <br />
          <small>(Logo by @TrpFrog)</small>
        </div>
      </label>
    </div>
  )
}

function HeaderCheckbox() {
  const [shouldFollowHeader, setShouldFollowHeader] = useUserSettingStickyHeader()
  const [shouldHideHeader, setShouldHideHeader] = useUserSettingAlwaysVisibleHeader()

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
            checked={!shouldHideHeader}
            disabled={!shouldFollowHeader}
            onChange={e => setShouldHideHeader(!e.target.checked)}
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
      <KawaiiCheckbox />
    </div>
  )
}
