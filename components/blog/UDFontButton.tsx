'use client';

import React, {useContext, useEffect, useState} from "react";
import {cookies} from "next/headers";
import {setCookie} from "nookies";
import {faFont, faUniversalAccess} from "@fortawesome/free-solid-svg-icons";
import EntryButton from "./EntryButton";
import styles from '../../../styles/blog/blog.module.scss';

export const UDFontStateContext = React.createContext({
  useUDFont: false,
  setUseUDFont: (() => {}) as any
})

export function UDFontStateProvider(props: {children: React.ReactNode}) {
  const cookie = cookies()
  const COOKIE_NAME_UD = 'useUDFonts'
  const [useUDFont, setUseUDFont] = useState(false)
  useEffect(() => {
    setUseUDFont(cookie.get(COOKIE_NAME_UD)?.value === 'true')
  }, [cookie])

  return (
    <UDFontStateContext.Provider value={{
      useUDFont, setUseUDFont
    }}>
      {props.children}
    </UDFontStateContext.Provider>
  )
}

export function UDFontButton() {
  const cookie = cookies()
  const COOKIE_NAME_UD = 'useUDFonts'
  const {useUDFont, setUseUDFont} = useContext(UDFontStateContext)

  const handleUDFontButton = () => {
    console.log(useUDFont)
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
        <EntryButton icon={faFont} text={'通常書体'}/>
      ) : (
        <EntryButton icon={faUniversalAccess} text={'UD書体'}/>
      )}
    </a>
  )
}

export function UDFontBlock ({children}: {children: React.ReactNode}) {
  const {useUDFont} = useContext(UDFontStateContext)

  return (
    <div className={useUDFont ? styles.with_ud_font : ''}>
      {children}
    </div>
  )
}
