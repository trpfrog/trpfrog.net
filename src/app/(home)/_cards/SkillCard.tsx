import { tv } from 'tailwind-variants'

import { TopCard } from '@/app/(home)/_components/TopCard'

const skillStyles = tv({
  slots: {
    wrapper: ['tw-h-full tw-w-full tw-p-2 tw-text-white'],
    text: 'tw-text-sm',
    name: 'tw-text-xl tw-font-bold',
  },
})()

function Skill(props: { name: string; level: number; className?: string }) {
  const { name, level, className } = props
  return (
    <div className={skillStyles.wrapper({ className })}>
      <h2 className={skillStyles.name()}>{name}</h2>
      <div>{level}</div>
    </div>
  )
}

const styles = tv({
  slots: {
    wrapper: 'tw-flex tw-w-full tw-items-center tw-justify-between',
    skill: 'tw-flex tw-flex-wrap tw-gap-2',
  },
})()
export function SkillCard() {
  return (
    <TopCard className={styles.wrapper()}>
      <Skill name={'TypeScript'} level={1} className="tw-bg-blue-700"></Skill>
      <Skill name={'HTML/CSS'} level={1} className="tw-bg-orange-500"></Skill>
      <Skill name={'React'} level={1} className="tw-bg-cyan-500"></Skill>
      <Skill name={'Java'} level={1} className="tw-bg-red-600"></Skill>
      <Skill name={'Python'} level={1} className="tw-bg-green-600"></Skill>
    </TopCard>
  )
}
