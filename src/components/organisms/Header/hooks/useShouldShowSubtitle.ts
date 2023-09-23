import { useEffect, useState } from 'react'

import { useScroll } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function useShouldShowSubtitle() {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const isTopPage = usePathname() === '/'
  const [heightToChangeTitle, setHeightToChangeTitle] = useState(250)

  useEffect(() => {
    if (isTopPage) {
      return
    }
    const isMobile = window.innerWidth <= 800
    setHeightToChangeTitle(isMobile ? 120 : 250)
  }, [isTopPage])

  const { scrollY } = useScroll()

  if (isTopPage) {
    return false
  }

  scrollY.on('change', (y: number) => {
    setShowPageTitle(y > heightToChangeTitle)
  })

  return showPageTitle
}
