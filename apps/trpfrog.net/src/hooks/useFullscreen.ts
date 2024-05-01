import { useEffect } from 'react'

export function useFullscreen() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const selectors = {
      header: 'body > div:has(header)',
      nav: 'body > nav',
      footer: 'body > footer',
      mobileMenu: 'body > section',
    }

    const defaultStyle = Object.fromEntries(
      Object.entries(selectors).map(([key, selector]) => {
        const el = document.querySelector(selector)
        return [key, el ? (el as HTMLElement).style.display : '']
      }),
    )

    // hide header, nav, footer, mobile menu
    Object.values(selectors).forEach(selector => {
      const el = document.querySelector(selector)
      if (el) {
        ;(el as HTMLElement).style.display = 'none'
      }
    })

    // restore default style
    return () => {
      Object.entries(selectors).forEach(([key, selector]) => {
        const el = document.querySelector(selector)
        if (el) {
          ;(el as HTMLElement).style.display = defaultStyle[key]
        }
      })
    }
  })
}
