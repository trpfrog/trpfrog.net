'use client'

import { memo } from 'react'

import Link from 'next/link'

import { tv } from '@/lib/tailwind/variants'

import { SiteName } from './SiteName'
import { useHeaderStatus } from './useHeaderStatus'

type TitleProps = {
  siteTitle?: string
  pageTitle?: string
}

const createStyles = tv({
  slots: {
    logo: 'tw-flex tw-items-center tw-gap-2 tw-font-mplus-rounded',
    trpfrog: 'tw-relative -tw-bottom-1.5 tw-size-[70px] sp:tw-size-[58px]',
    siteNameWrapper: 'tw-my-auto tw-flex tw-h-fit tw-flex-col tw-gap-1',
    titleLink: 'tw-cursor-pointer tw-text-white hover:tw-text-trpfrog-200',
  },
  variants: {
    showTrpFrog: {
      false: {
        trpfrog: 'tw-translate-y-[90%] tw-duration-300',
        siteNameWrapper: `tw-translate-x-[-70px] tw-duration-[320ms] sp:tw-translate-x-[-58px]`,
      },
      true: {
        trpfrog: 'tw-duration-[320ms]',
        siteNameWrapper: 'tw-duration-300',
      },
    },
  },
})

export const SiteNameWithIcon = memo(function SiteNameWithIcon(props: TitleProps) {
  const { visibleTrpFrog, visibleSubtitle } = useHeaderStatus()
  const styles = createStyles({
    showTrpFrog: visibleTrpFrog,
  })

  return (
    <div className={styles.logo()}>
      <img src="/images/flat-trpfrog.gif" alt="" className={styles.trpfrog()} />
      <div className={styles.siteNameWrapper()}>
        <Link href="/" className={styles.titleLink()}>
          <SiteName
            siteTitle={props.siteTitle}
            pageTitle={props.pageTitle}
            showPageTitle={visibleSubtitle}
          />
        </Link>
      </div>
    </div>
  )
})
