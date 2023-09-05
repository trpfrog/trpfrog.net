import { useEffect, useState } from 'react'

import { useScroll } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SITE_NAME } from '@/lib/constants'

import styles from './index.module.scss'

function usePageTitle() {
  const [pageTitle, setPageTitle] = useState('')
  useEffect(() => {
    setPageTitle(document?.title.split(' - ')[0] ?? '')
  }, [])
  return pageTitle
}

type Props = {
  siteTitle?: string
  pageTitle?: string
}

const TitleWithPageName = (props: Props) => {
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

export const NormalTitle = (props: Props) => {
  const [showPageTitle, setShowPageTitle] = useState(false)

  const [heightToChangeTitle, setHeightToChangeTitle] = useState(250)
  useEffect(
    () => setHeightToChangeTitle(window.innerWidth <= 800 ? 120 : 250),
    [],
  )

  const { scrollY } = useScroll()
  scrollY.on('change', (y: number) => {
    setShowPageTitle(y > heightToChangeTitle)
  })

  return (
    <div id={styles.site_logo}>
      <div id={styles.trpfrog_icon} />
      <div id={styles.site_name_wrapper}>
        <h1 id={styles.site_name}>
          {showPageTitle ? (
            <Link
              href="/"
              style={{ cursor: 'pointer' }}
              className={styles.title_link}
            >
              <TitleWithPageName
                siteTitle={props.siteTitle}
                pageTitle={props.pageTitle}
              />
            </Link>
          ) : (
            <Link href="/" className={styles.title_link}>
              {SITE_NAME}
            </Link>
          )}
        </h1>
      </div>
    </div>
  )
}
