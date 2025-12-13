import { TopCard } from '@/app/(home)/_components/TopCard'

import { tv } from '@/lib/tailwind'
import { replaceWithLighterImageFormat } from '@/lib/utils'

const src = replaceWithLighterImageFormat(
  'https://res.cloudinary.com/trpfrog/image/upload/w_500/working-tsmami-half.webp',
)

const styles = tv({
  slots: {
    wrapper: ['tw:size-full tw:bg-linear-to-r tw:from-yellow-800/20 tw:to-zinc-800/60'],
    text: [
      'tw:flex tw:size-full tw:flex-col tw:items-end tw:justify-center',
      'tw:relative tw:top-1 tw:p-3 tw:text-right tw:text-white tw:drop-shadow-lg',
    ],
    name: 'tw:text-lg tw:font-bold',
    details: 'tw:text-sm tw:font-bold',
    theme: 'tw:text-xs',
    date: 'tw:text-xs',
  },
})()

export function BelongingCard() {
  return (
    <TopCard
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
      title="Job"
      titlePosition="top-right"
    >
      <div className={styles.wrapper()}>
        <div className={styles.text()}>
          <h3 className={styles.name()}>Webエンジニア</h3>
          {/* <div className={styles.details()}></div> */}
          <div className={styles.date()}>Since 2025.04</div>
          <div className={styles.theme()}>今はバックエンドが中心</div>
        </div>
      </div>
    </TopCard>
  )
}
