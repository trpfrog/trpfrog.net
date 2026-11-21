import { useSyncExternalStore } from 'react'

import { SITE_NAME } from '@/lib/constants'
import { tv } from '@/lib/tailwind'

type TitleWithPageNameProps = {
  siteTitle?: string
  pageTitle?: string
  showPageTitle?: boolean
  pathname: string
}

const createStyles = tv({
  slots: {
    wrapper: [
      'tw:items-start tw:translate-y-0.5 tw:*:leading-none',
      'tw:flex tw:flex-col tw:gap-0.5 tw:text-white tw:hover:text-trpfrog-50',
    ],
    title: 'tw:text-[1.7rem] tw:font-extrabold tw:sp:text-[1.4rem]',
    subtitle: 'tw:line-clamp-1 tw:text-base tw:font-semibold tw:sp:text-[11px]',
  },
  variants: {
    showPageTitle: {
      false: {
        subtitle: 'tw:hidden',
      },
    },
  },
})

// ページ遷移で <title> が書き換わったら追従する
function subscribeTitle(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.head, { subtree: true, childList: true, characterData: true })
  return () => observer.disconnect()
}

function usePageTitle() {
  return useSyncExternalStore(
    subscribeTitle,
    () => document.title.split(' - ')[0] ?? '',
    () => '',
  )
}

export function SiteName(props: TitleWithPageNameProps) {
  const pathname = props.pathname ?? '/'
  const siteTitle = props.siteTitle ?? (pathname.startsWith('/blog/') ? 'つまみログ' : SITE_NAME)
  const pageTitleFromHook = usePageTitle()
  const pageTitle = props.pageTitle ?? pageTitleFromHook

  const styles = createStyles({ showPageTitle: props.showPageTitle ?? false })

  return (
    <div className={styles.wrapper()}>
      <h1 className={styles.title()}>{siteTitle}</h1>
      {pageTitle ? <h2 className={styles.subtitle()}>{pageTitle}</h2> : null}
    </div>
  )
}
