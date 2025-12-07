import { LinkTopCard } from '@/app/(home)/_components/TopCard'

import { tv } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'

const src = replaceWithLighterImageFormat(
  'https://res.cloudinary.com/trpfrog/image/upload/f_auto,c_limit,w_100,q_auto/environment/desk',
)

const styles = tv({
  slots: {
    bgImage: ['tw:bg-cover tw:bg-center tw:bg-no-repeat'],
    base: [
      'tw:h-full tw:w-full tw:p-8 tw:backdrop-blur-[2px]',
      'tw:bg-linear-to-br tw:from-window-color tw:via-transparent tw:to-window-color',
      'tw:flex tw:flex-col tw:items-center tw:justify-center',
      'tw:text-center tw:text-4xl tw:font-bold tw:text-white tw-text-opacity-80',
    ],
    nameWrapper: 'tw:flex tw:items-baseline tw:gap-2',
    name: 'tw:first:text-4xl tw:first:font-bold tw:last:text-2xl',
  },
})()

export function EnvironmentCard() {
  return (
    <LinkTopCard
      className={styles.bgImage()}
      style={{
        backgroundImage: `url('${src}')`,
      }}
      href="/environment"
    >
      <div className={styles.base()}>作業環境</div>
    </LinkTopCard>
  )
}
