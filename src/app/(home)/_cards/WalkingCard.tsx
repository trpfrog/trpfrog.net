import { tv } from 'tailwind-variants'

import { TopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { A } from '@/components/wrappers'

const backgroundImage =
  'https://res.cloudinary.com/trpfrog/blog/tokyotower-walking/20210324231643'

const styles = tv({
  slots: {
    bg: 'tw-bg-cover tw-bg-center tw-bg-no-repeat',
    wrapper: [
      'tw-h-full tw-w-full tw-backdrop-brightness-50',
      'tw-px-4 tw-py-2 tw-text-sm tw-text-white',
    ],
    h2: 'tw-mb-1 tw-text-2xl tw-font-bold',
    button: cardButtonStyle({
      className: 'tw-absolute tw-bottom-3 tw-right-4',
    }),
  },
})()

export function WalkingCard() {
  return (
    <TopCard
      className={styles.bg()}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={styles.wrapper()}>
        <h2 className={styles.h2()}>Walking</h2>
        <div>たまに長距離を歩いて移動して記事を書いています。(最長 70.5km)</div>
        <A href="/walking" className={styles.button()}>
          もっと見る
        </A>
      </div>
    </TopCard>
  )
}
