'use client'

import Link from 'next/link'

import { SITE_NAME } from '@/lib/constants'

import { useShouldShowSubtitle } from './hooks/useShouldShowSubtitle'
import { useShouldShowTrpFrog } from './hooks/useShouldShowTrpFrog'
import styles from './index.module.scss'
import { TitleWithPageName } from './TitleWithPageName'

export type TitleProps = {
  siteTitle?: string
  pageTitle?: string
}

export const SiteName = (props: TitleProps) => {
  const shouldShowSubtitle = useShouldShowSubtitle()
  const shouldShowTrpFrog = useShouldShowTrpFrog()

  return (
    <div className={styles.site_logo} data-show-icon={shouldShowTrpFrog}>
      <div className={styles.trpfrog_icon} />
      <div className={styles.site_name_wrapper}>
        <h1 className={styles.site_name}>
          {shouldShowSubtitle ? (
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
