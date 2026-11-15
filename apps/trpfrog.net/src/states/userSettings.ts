'use client'

import { useSearchParams } from 'next/navigation'

import { createLocalStorage, createPreference, type Preference } from '@ui-sdk/core'
import { usePreference } from '@ui-sdk/react/preferences'
import { match } from 'ts-pattern'

type Flag = 'true' | 'false'

// 古い形式では JSON で保存していた。true/false の JSON は文字列と同じ表記なので
// そのまま読める。保存済みの設定を引き継ぐため、キーは変えないこと
function createFlag(key: string, attribute: `data-${string}`, defaultValue: boolean) {
  return createPreference<Flag>({
    values: ['true', 'false'],
    defaultValue: defaultValue ? 'true' : 'false',
    attribute,
    storage: createLocalStorage(key),
  })
}

function useFlag(preference: Preference<Flag>) {
  const { value } = usePreference(preference)
  const set = (next: boolean) => void preference.set(next ? 'true' : 'false')
  return [value === 'true', set] as const
}

const stickyHeader = createFlag('shouldFollowHeader', 'data-sticky-header', true)
const alwaysVisibleHeader = createFlag('alwaysStickHeader', 'data-always-visible-header', false)
const kawaiiLogo = createFlag('kawaii-logo', 'data-kawaii-logo', false)

/** ヘッダーをスクロールに追従させるか */
export function useUserSettingStickyHeader() {
  return useFlag(stickyHeader)
}

/** スクロールしてもヘッダーを隠さないか */
export function useUserSettingAlwaysVisibleHeader() {
  return useFlag(alwaysVisibleHeader)
}

/** かわいいロゴを使うか (ユーザー設定) */
export function useUserSettingKawaiiLogo() {
  return useFlag(kawaiiLogo)
}

/** かわいいロゴを使うか。?kawaii=true|false があればユーザー設定より優先する */
export function useIsKawaiiLogo() {
  const [userSetting] = useUserSettingKawaiiLogo()
  const kawaiiSearchParam = useSearchParams().get('kawaii')
  return match(kawaiiSearchParam?.toLowerCase())
    .with('true', () => true)
    .with('false', () => false)
    .otherwise(() => userSetting)
}
