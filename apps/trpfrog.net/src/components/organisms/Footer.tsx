import { cacheTags } from '@trpfrog.net/constants'

import { bffClient } from '@/app/api/client'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    footer: 'tw:bg-trpfrog-700',
    inner: 'tw:my-2.5 tw:flex tw:items-center tw:justify-between',
    copyright: 'tw:font-mplus-rounded tw:font-bold tw:text-white/70 tw:pc:text-lg',
    links: 'tw:space-x-2',
    link: [
      'tw:rounded-full tw:px-3 tw:py-0.5 tw:text-white/70 tw:hover:text-white',
      'tw:bg-trpfrog-500 tw:font-bold',
    ],
  },
})()

// TODO: dynamicIO が stable になったら消す
async function fetchCurrentYear() {
  return await fetch(bffClient.tmp_cache.year.$url().toString(), {
    cache: 'force-cache',
    next: {
      tags: [cacheTags.date.tag],
    },
  }).then(res => res.text())
}

export async function Footer() {
  const year = await fetchCurrentYear()
  return (
    <footer className={styles.footer()}>
      <MainWrapper className={styles.inner()}>
        <div className={styles.copyright()}>&copy; 2019-{year} つまみ</div>
        <div className={styles.links()}>
          <A openInNewTab href="https://github.com/trpfrog/trpfrog.net" className={styles.link()}>
            GitHub
          </A>
          <A href={'/legal'} className={styles.link()}>
            Legal
          </A>
        </div>
      </MainWrapper>
    </footer>
  )
}
