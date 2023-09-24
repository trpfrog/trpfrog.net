import { useState } from 'react'

import { useScroll } from 'framer-motion'

import { useIsAlwaysShownHeader } from '@/components/organisms/Header'

import { useShouldHideHeaderAtom } from '@/states/shouldHideHeaderAtom'

export function useHeaderVisibleStatus() {
  const { scrollY } = useScroll()
  const [showHeader, setShowHeader] = useState(true)

  scrollY.on('change', (y: number) => {
    const v = scrollY.getVelocity()
    const shouldShowHeader = v < -1000 || y < 500
    const shouldHideHeader = !shouldShowHeader && v > 1000

    if (shouldShowHeader) {
      setShowHeader(true)
    } else if (shouldHideHeader) {
      setShowHeader(false)
    }
  })

  const isAlwaysShowHeader = useIsAlwaysShownHeader()
  const [useSettingShouldHideHeader] = useShouldHideHeaderAtom()
  return showHeader || isAlwaysShowHeader || !useSettingShouldHideHeader
}
