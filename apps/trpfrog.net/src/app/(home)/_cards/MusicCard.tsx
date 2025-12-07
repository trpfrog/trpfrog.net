import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { tv } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'

const src = replaceWithLighterImageFormat(
  'https://res.cloudinary.com/trpfrog/image/upload/w_1000/musicbanner-with-notext',
)

const styles = tv({
  slots: {
    bg: [
      'tw:bg-cover tw:bg-left tw:bg-no-repeat tw:py-3 tw:pl-[140px] tw:pr-5 tw:text-right',
      'tw:flex tw:flex-col tw:items-end tw:justify-center',
    ],
    h2: 'tw:text-2xl tw:font-bold tw:text-white',
    text: 'tw:my-2 tw:text-[12px] tw:leading-tight tw:text-white tw:*:inline-block',
    button: cardButtonStyle({
      class: 'tw:relative tw:bottom-0 tw:-right-px',
    }),
  },
})()

export function MusicCard() {
  return (
    <LinkTopCard
      href="/music"
      className={styles.bg()}
      style={{
        backgroundImage: `url('${src}')`,
      }}
    >
      <h2 className={styles.h2()}>Music</h2>
      <div className={styles.text()}>
        <span>友人の</span>
        <span>ねぎ一世さんに</span>
        <span>作曲して</span>
        <span>いただいた</span>
        <span>テーマソング (？)</span>
      </div>
    </LinkTopCard>
  )
}
