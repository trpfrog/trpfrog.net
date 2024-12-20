'use client'

import { LabelledCheckbox } from '@/components/molecules/LabelledCheckbox'

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
    <LabelledCheckbox checked={showKawaiiLogo} onChange={setShowKawaiiLogo}>
      かわいいロゴモード
      <br />
      <small>(Logo by @TrpFrog)</small>
    </LabelledCheckbox>
  )
}

function HeaderCheckbox() {
  const [shouldFollowHeader, setShouldFollowHeader] = useUserSettingStickyHeader()
  const [shouldHideHeader, setShouldHideHeader] = useUserSettingAlwaysVisibleHeader()

  return (
    <>
      <LabelledCheckbox checked={shouldFollowHeader} onChange={setShouldFollowHeader}>
        ヘッダを追従させる
      </LabelledCheckbox>
      <LabelledCheckbox
        checked={!shouldHideHeader}
        disabled={!shouldFollowHeader}
        onChange={value => setShouldHideHeader(!value)}
      >
        スクロール時ヘッダを隠す
      </LabelledCheckbox>
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
