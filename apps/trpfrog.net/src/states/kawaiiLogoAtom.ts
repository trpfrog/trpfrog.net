import { useEffect, useState } from 'react'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useSearchParams } from 'next/navigation'
import { match } from 'ts-pattern'

const kawaiiLogoAtom = atomWithStorage('kawaii-logo', false)

export function useKawaiiLogoAtom() {
  const [kawaii, setKawaii] = useAtom(kawaiiLogoAtom)

  // HACK: Fix hydration error in Next.js 14
  // https://medium.com/@koalamango/fix-next-js-hydration-error-with-zustand-state-management-0ce51a0176ad
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])

  return [hydrated ? kawaii : false, setKawaii] as const
}

export function useIsKawaiiLogo() {
  const [userSettingShouldShowKawaiiLogo] = useKawaiiLogoAtom()
  const kawaiiSearchParam = useSearchParams().get('kawaii')
  return match(kawaiiSearchParam?.toLowerCase())
    .with('true', () => true)
    .with('false', () => false)
    .otherwise(() => userSettingShouldShowKawaiiLogo)
}
