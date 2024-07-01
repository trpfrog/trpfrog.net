import React from 'react'

import { TopCard } from '@/app/(home)/_components/TopCard'

import { Devicon } from '@/components/atoms/Devicon'

import { tv } from '@/lib/tailwind/variants'
import { ParseWithBudouX } from '@/lib/wordSplit'

const styles = tv({
  slots: {
    grid: ['tw-grid tw-h-full tw-gap-0.5 pc:tw-grid-cols-6', 'sp:tw-flex sp:tw-flex-col'],
    wrapper: [
      'tw-grid-rows tw-grid tw-grid-rows-subgrid',
      'tw-gap-1 tw-bg-zinc-200 tw-py-3',
      '*:tw-text-center',
      'sp:tw-flex sp:tw-items-center sp:tw-gap-4 sp:tw-pl-6 sp:*:tw-text-left',
    ],
    icon: [
      'tw-grid tw-place-items-center tw-text-[2.8rem] tw-font-bold',
      'tw-relative tw-top-1.5 tw-drop-shadow sp:tw-top-0',
    ],
    title: 'tw-text-sm tw-font-bold tw-drop-shadow-sm',
    text: 'tw-grid-rows-subgrid',
    description: 'tw-text-balance tw-text-[10px]',
  },
})()

type FavoriteProps = {
  icon: React.ReactNode
  title: string
  description: string | string[]
  className?: string
  style?: React.CSSProperties
}

function Skill(props: FavoriteProps) {
  const description =
    typeof props.description === 'string' ? [props.description] : props.description
  return (
    <div
      style={{ gridRow: '1 / -1', ...(props.style ?? {}) }}
      className={styles.wrapper({ className: props.className })}
    >
      <div className={styles.icon()}>{props.icon}</div>
      <div>
        <div className={styles.title()}>{props.title}</div>
        <div className={styles.description()} style={{ gridRow: '2 / -1' }}>
          {description
            .map(desc => <ParseWithBudouX str={desc} slug={''} key={desc} />)
            .flatMap((x, i) => (i !== description.length - 1 ? [x, <br key={i} />] : x))}
        </div>
      </div>
    </div>
  )
}

export function SkillCard() {
  return (
    <TopCard
      title="Skills"
      className={styles.grid()}
      style={{ gridTemplateRows: '1fr min-content min-content' }}
      titlePosition={'top-right'}
    >
      <Skill
        title="TypeScript"
        description={['メインで書く', '型パズルもやる']}
        icon={<Devicon iconName="TypeScript" />}
        className="tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 tw-text-white"
      />
      <Skill
        title="React"
        description={['頻繁に使う', 'Next.js とよく使う']}
        icon={<Devicon iconName="React" />}
        className="tw-bg-gradient-to-br tw-from-cyan-500 tw-to-cyan-600 tw-text-white"
      />
      <Skill
        title="HTML/CSS"
        description="大学1年の頃からずっと書いている"
        icon={<Devicon iconName="HTML" />}
        className="tw-bg-gradient-to-br tw-from-amber-500 tw-to-amber-600 tw-text-white"
      />
      <Skill
        title="Python"
        description={['研究でよく使う', 'PyTorch など']}
        icon={<Devicon iconName="Python" />}
        className="tw-bg-gradient-to-br tw-from-lime-600 tw-to-lime-700 tw-text-white"
      />
      <Skill
        title="C++"
        description={['競プロで使った', '業プロは厳しそう']}
        icon={<Devicon iconName="C++" />}
        className="tw-bg-gradient-to-br tw-from-violet-500 tw-to-violet-600 tw-text-white"
      />
      <Skill
        title="Java"
        description={['初めて触った言語', 'ゲーム作った']}
        icon={<Devicon iconName="Java" />}
        className="tw-bg-gradient-to-br tw-from-pink-500 tw-to-pink-600 tw-text-white"
      />
    </TopCard>
  )
}
