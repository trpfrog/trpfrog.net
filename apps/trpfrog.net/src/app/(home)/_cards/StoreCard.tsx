import { LinkTopCard } from '@/app/(home)/_components/TopCard'

import { twMerge } from '@/lib/tailwind/merge'
import { tv } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'

const src = replaceWithLighterImageFormat(
  'https://res.cloudinary.com/trpfrog/image/upload/w_300/trpfrog-store',
)

const styles = tv({
  slots: {
    card: 'sp:tw-h-32',
    absolute: 'tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-full',
    bgImage: `
      tw-absolute tw-left-0 tw-top-0
      tw-h-full tw-w-full
      -tw-skew-x-12 tw-skew-y-6 tw-scale-110
      tw-bg-cover tw-bg-center tw-bg-no-repeat 
    `,
    text: `
      tw-flex tw-h-full tw-w-full tw-flex-col
      tw-items-center tw-justify-center tw-bg-black/60
      tw-text-center tw-text-white
    `,
  },
})()

export function StoreCard() {
  return (
    <LinkTopCard href="https://suzuri.jp/TrpFrog" openInNewTab className={styles.card()}>
      <div className={twMerge(styles.text(), styles.absolute({ class: 'tw-z-10' }))}>
        <h2 className="tw-text-4xl tw-font-bold">Goods</h2>
        <span className="tw-text-sm">
          つまみアイコン関連グッズ
          <br />
          SUZURI にて販売中 !
        </span>
      </div>
      <div
        className={twMerge(styles.bgImage(), styles.absolute())}
        style={{ backgroundImage: `url('${src}')` }}
      />
    </LinkTopCard>
  )
}
