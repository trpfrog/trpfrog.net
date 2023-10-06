'use client'

import React, { useContext, useEffect, useState } from 'react'

import { faFont, faUniversalAccess } from '@fortawesome/free-solid-svg-icons'
import { parseCookies, setCookie } from 'nookies'

import styles from '@blog/_styles/blog.module.scss'

import { EntryButton } from './EntryButton'

export const UDFontStateContext = React.createContext({
  useUDFont: false,
  setUseUDFont: (() => {}) as any,
})

export function UDFontStateProvider(props: { children: React.ReactNode }) {
  const COOKIE_NAME_UD = 'useUDFonts'
  const cookie = parseCookies()
  const [useUDFont, setUseUDFont] = useState(false)
  useEffect(() => {
    setUseUDFont(cookie[COOKIE_NAME_UD] === 'true')
  }, [cookie])

  return (
    <UDFontStateContext.Provider
      value={{
        useUDFont,
        setUseUDFont,
      }}
    >
      {props.children}
    </UDFontStateContext.Provider>
  )
}

export function UDFontButton() {
  const COOKIE_NAME_UD = 'useUDFonts'
  const { useUDFont, setUseUDFont } = useContext(UDFontStateContext)

  const handleUDFontButton = () => {
    if (useUDFont) {
      setCookie(null, COOKIE_NAME_UD, 'false', {
        maxAge: 1,
        path: '/',
      })
    } else {
      setCookie(null, COOKIE_NAME_UD, 'true', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    }
    setUseUDFont(!useUDFont)
  }

  return (
    <a onClick={handleUDFontButton}>
      {useUDFont ? (
        <EntryButton icon={faFont} text={'通常書体'} />
      ) : (
        <EntryButton icon={faUniversalAccess} text={'UD書体'} />
      )}
    </a>
  )
}

export function UDFontBlock({ children }: { children: React.ReactNode }) {
  const { useUDFont } = useContext(UDFontStateContext)

  return <div className={useUDFont ? styles.with_ud_font : ''}>{children}</div>
}
