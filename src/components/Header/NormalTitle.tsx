import { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './index.module.scss'
import { SITE_NAME } from '@/lib/constants'

const TitleWithPageName = () => {
  const pathname = usePathname() ?? '/'

  let siteTitle = pathname.startsWith('/blog/') ? 'つまみログ' : SITE_NAME

  const [pageTitle, setPageTitle] = useState('')
  useEffect(() => {
    setPageTitle(document?.title.split(' - ')[0] ?? '')
  }, [])

  return (
    <div className={styles.on_subtitle_showed}>
      {siteTitle}
      {pageTitle ? (
        <>
          <br />
          <div id={styles.subtitle}>{pageTitle}</div>
        </>
      ) : null}
    </div>
  )
}

export const NormalTitle = () => {
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
            <Link href="/" style={{ cursor: 'pointer' }}>
              <TitleWithPageName />
            </Link>
          ) : (
            <Link href="/">{SITE_NAME}</Link>
          )}
        </h1>
      </div>
    </div>
  )
}
