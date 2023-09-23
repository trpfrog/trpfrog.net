import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { SITE_NAME } from '@/lib/constants'

import styles from './index.module.scss'

export type TitleWithPageNameProps = {
  siteTitle?: string
  pageTitle?: string
}

function usePageTitle() {
  const [pageTitle, setPageTitle] = useState('')
  useEffect(() => {
    setPageTitle(document?.title.split(' - ')[0] ?? '')
  }, [])
  return pageTitle
}

export function TitleWithPageName(props: TitleWithPageNameProps) {
  const pathname = usePathname() ?? '/'
  const siteTitle =
    props.siteTitle ??
    (pathname.startsWith('/blog/') ? 'つまみログ' : SITE_NAME)
  const pageTitleFromHook = usePageTitle()
  const pageTitle = props.pageTitle ?? pageTitleFromHook

  return (
    <span className={styles.on_subtitle_showed}>
      {siteTitle}
      {pageTitle ? (
        <>
          <br />
          <span id={styles.subtitle}>{pageTitle}</span>
        </>
      ) : null}
    </span>
  )
}
