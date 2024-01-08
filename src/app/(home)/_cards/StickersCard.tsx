import { LinkTopCard } from '@/app/(home)/_components/TopCard'

import { twMerge } from '@/lib/tailwind/merge'
import { tv } from '@/lib/tailwind/variants'

const src = 'https://res.cloudinary.com/trpfrog/w_300/stickers'

const styles = tv({
  slots: {
    card: 'sp:tw-h-32',
    absolute: 'tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-full',
    bgImage: `
      tw-absolute tw-left-0 tw-top-0
      tw-h-full tw-w-full
      -tw-skew-x-12 tw-skew-y-6 tw-scale-125
      tw-bg-cover tw-bg-center tw-bg-no-repeat 
    `,
    text: `
      tw-flex tw-h-full tw-w-full tw-flex-col
      tw-items-center tw-justify-center tw-bg-black/70
      tw-text-center tw-text-white
    `,
  },
})()

export function StickersCard() {
  return (
    <LinkTopCard href="/stickers" className={styles.card()}>
      <div
        className={twMerge(
          styles.text(),
          styles.absolute({ class: 'tw-z-10' }),
        )}
      >
        <h2 className="tw-text-4xl tw-font-bold">Stickers</h2>
        <span className="tw-text-sm">LINE スタンプ 全2種 販売中 !</span>
      </div>
      <div
        className={twMerge(styles.bgImage(), styles.absolute())}
        style={{ backgroundImage: `url('${src}')` }}
      />
    </LinkTopCard>
  )
}