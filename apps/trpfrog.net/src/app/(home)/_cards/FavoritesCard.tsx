import React from 'react'

import { faCode, faStar, faWalking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { TopCard } from '@/app/(home)/_components/TopCard'

import { tv } from '@/lib/tailwind/variants'
import { ParseWithBudouX } from '@/lib/wordSplit'

const styles = tv({
  slots: {
    grid: 'tw-grid tw-h-full tw-grid-cols-3 tw-gap-0.5',
    wrapper: [
      'tw-grid-rows tw-grid tw-grid-rows-subgrid',
      'tw-gap-1 tw-bg-zinc-200 tw-px-1 tw-py-3',
      '*:tw-text-center',
    ],
    icon: [
      'tw-grid tw-place-items-center tw-text-4xl tw-font-bold',
      'tw-relative tw-top-1.5 tw-drop-shadow',
    ],
    title: 'tw-text-sm tw-font-bold tw-drop-shadow-sm',
    description: 'tw-text-balance tw-text-center tw-text-[10px]',
  },
})()

type FavoriteProps = {
  icon: React.ReactNode
  title: string
  description?: string
  className?: string
  style?: React.CSSProperties
}

function Favorite(props: FavoriteProps) {
  return (
    <div
      style={{ gridRow: '1 / -1', ...(props.style ?? {}) }}
      className={styles.wrapper({ className: props.className })}
    >
      <div className={styles.icon()}>{props.icon}</div>
      <div className={styles.title()}>{props.title}</div>
      {props.description && (
        <div className={styles.description()}>
          <ParseWithBudouX str={props.description} slug={''} />
        </div>
      )}
    </div>
  )
}

export function FavoritesCard() {
  return (
    <TopCard
      title="Favorites"
      className={styles.grid()}
      style={{ gridTemplateRows: '1fr min-content min-content' }}
    >
      <Favorite
        title="Web開発"
        description="ほかにも便利なツール作りなど"
        icon={<FontAwesomeIcon icon={faCode} />}
        className="tw-bg-gradient-to-br tw-from-sky-500 tw-to-sky-600 tw-text-white"
      />
      <Favorite
        title="散歩"
        icon={<FontAwesomeIcon icon={faWalking} />}
        description="裏道探すのとか好き／地図もよく見る"
        className="tw-bg-gradient-to-br tw-from-pink-500 tw-to-pink-600 tw-text-white"
      />
      <Favorite
        title="漫画・アニメ"
        description="百合をよくみる"
        icon={<FontAwesomeIcon icon={faStar} />}
        className="tw-bg-gradient-to-br tw-from-yellow-500 tw-to-yellow-600 tw-text-white"
      />
    </TopCard>
  )
}
