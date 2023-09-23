import { useEffect, useState } from 'react'

import { useScroll } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function useShouldShowTrpFrog() {
  const [visible, setVisible] = useState(false)
  const isTopPage = usePathname() === '/'
  const animationHeight = 250

  const { scrollY } = useScroll()
  useEffect(() => {
    if (!isTopPage) {
      return
    }
    setVisible(window.scrollY >= animationHeight)
  }, [isTopPage])

  if (!isTopPage) {
    return true
  }

  scrollY.on('change', () => {
    setVisible(window.scrollY >= animationHeight)
  })

  return visible
}
