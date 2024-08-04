import { LinkTopCard } from '@/app/(home)/_components/TopCard'

import { tv } from '@/lib/tailwind/variants'

const styles = tv({
  slots: {
    wrapper: [
      'tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center',
      'tw-bg-zinc-800 tw-py-3',
    ],
    skill: 'tw-flex tw-flex-wrap tw-gap-2',
    textGradient: [
      'tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center',
      'tw-bg-gradient-to-br tw-from-cyan-100 tw-via-cyan-500 tw-to-cyan-100 tw-bg-clip-text',
      'tw-font-bold tw-text-transparent',
    ],
    rating: 'tw-text-7xl tw-font-bold',
  },
})()

export function CompetitiveCard() {
  return (
    <LinkTopCard className={styles.wrapper()} openInNewTab href="https://atcoder.jp/users/TrpFrog">
      <div className={styles.textGradient()}>
        <div className={styles.rating()}>
          <span className="-tw-mr-1 tw-text-3xl">max</span>
          1596
        </div>
        <div>AtCoder 水色レーティング</div>
      </div>
    </LinkTopCard>
  )
}
