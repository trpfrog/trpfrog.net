import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useSearchParams } from 'next/navigation'
import { match } from 'ts-pattern'

const kawaiiLogoAtom = atomWithStorage('kawaii-logo', false)

export function useKawaiiLogoAtom() {
  return useAtom(kawaiiLogoAtom)
}

export function useIsKawaiiLogo() {
  const kawaiiSearchParam = useSearchParams().get('kawaii')
  const [isKawaiiLogoSettingIsSet] = useKawaiiLogoAtom()

  return match(kawaiiSearchParam?.toLowerCase())
    .with('true', () => true)
    .with('false', () => false)
    .otherwise(() => isKawaiiLogoSettingIsSet)
}
