import { tv } from 'tailwind-variants'

import { TopCard } from '@/app/(home)/_components/TopCard'

const image =
  'https://res.cloudinary.com/trpfrog/blog/sugadaira-travel/42C94C5A-04C6-4DEC-9D41-2C87F87D79B7_1_105_c.jpg'

const styles = tv({
  slots: {
    bgImage: ['tw-bg-cover tw-bg-center tw-bg-no-repeat'],
    base: [
      'tw-h-full tw-w-full tw-bg-gradient-to-br tw-from-window-color tw-to-transparent tw-p-8',
    ],
    nameWrapper: 'tw-flex tw-items-baseline tw-gap-2 ',
    name: 'first:tw-text-4xl first:tw-font-bold last:tw-text-2xl',
  },
})()

export function AboutMeCard() {
  return (
    <TopCard
      className={styles.bgImage()}
      style={{ backgroundImage: `url('${image}')` }}
      title="About Me"
    >
      <div className={styles.base()}>
        <h2 className={styles.nameWrapper()} translate="no">
          <span className={styles.name()}>つまみ</span>
          <span className={styles.name()}>(TrpFrog)</span>
        </h2>
        <p>
          2000年生まれの大学院生。Web 開発が好きで、このサイトは Next.js
          で作成されている。
        </p>
      </div>
    </TopCard>
  )
}
