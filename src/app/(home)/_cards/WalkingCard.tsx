import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { tv } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'

const backgroundImage = replaceWithLighterImageFormat(
  'https://res.cloudinary.com/trpfrog/image/upload/w_600/blog/tokyotower-walking/20210324231643',
)

const styles = tv({
  slots: {
    bg: 'tw-bg-cover tw-bg-center tw-bg-no-repeat sp:tw-h-32',
    wrapper: [
      'tw-flex tw-flex-col tw-items-center tw-justify-between',
      'tw-bg-gradient-to-b tw-from-zinc-800 tw-via-transparent tw-to-zinc-800',
      'tw-h-full tw-w-full tw-p-3',
      'tw-text-center tw-text-xs tw-text-white tw-opacity-90',
    ],
    h2: 'tw-mb-1 tw-text-3xl tw-font-bold',
    button: cardButtonStyle({
      className: 'tw-absolute tw-bottom-3 tw-right-4',
    }),
  },
})()

export function WalkingCard() {
  return (
    <LinkTopCard
      href="/walking"
      className={styles.bg()}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={styles.wrapper()}>
        <h2 className={styles.h2()}>Walking</h2>
        <div>
          たまに長距離を歩いて移動して
          <br />
          記事を書いています。(最長 70.5km)
        </div>
      </div>
    </LinkTopCard>
  )
}
