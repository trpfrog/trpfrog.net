import * as path from 'path'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { WorksFrontmatter, WorksFrontmatterSchema } from '@/app/works/schema'

import { Devicon, hasDevicon } from '@/components/atoms/Devicon'

import { MarkdownWithFrontmatter, readMarkdowns } from '@/lib/mdLoader'
import { tv } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'
import { ParseWithBudouX } from '@/lib/wordSplit'

const workStyles = tv({
  slots: {
    wrapper: 'tw:rounded-xs tw:bg-cover tw:bg-center',
    backdrop:
      'tw:size-full tw:p-2 tw:backdrop-blur-[1.5px] ' +
      'tw:flex tw:h-full tw:w-full tw:flex-col tw:justify-end tw:text-white',
    title: 'tw:text-lg tw:font-bold tw:leading-tight tw:text-white tw:drop-shadow-sm',
    subtitle: 'tw:mt-1 tw:text-[11px] tw:leading-tight tw:text-white tw:drop-shadow-sm',
    keywords:
      'tw:flex tw:gap-1 tw:text-xs tw:leading-none ' + 'tw:mb-1 tw:w-fit tw:overflow-hidden',
    keyword: 'tw:text-lg tw:drop-shadow-sm',
  },
})()

function Work(props: { content: MarkdownWithFrontmatter<WorksFrontmatter>; className?: string }) {
  const { content, className } = props
  const imageUrl = replaceWithLighterImageFormat(
    `https://res.cloudinary.com/trpfrog/image/upload/w_150/${content.metadata.image?.path}`,
  )

  return (
    <div
      className={workStyles.wrapper({ className })}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7)), url('${imageUrl}')`,
      }}
    >
      <div className={workStyles.backdrop()}>
        <div className={workStyles.keywords()}>
          {content.metadata.keywords?.filter(hasDevicon).map(k => (
            <Devicon key={k} className={workStyles.keyword()} iconName={k} />
          ))}
        </div>
        <h3 className={workStyles.title()}>
          <ParseWithBudouX str={content.metadata.title} slug={''} />
        </h3>
        {content.metadata.subtitle && (
          <div className={workStyles.subtitle()}>{content.metadata.subtitle}</div>
        )}
      </div>
    </div>
  )
}

const styles = tv({
  slots: {
    wrapper: 'tw:grid tw:grid-cols-3 tw:gap-0.5 tw:sp:grid-cols-2',
  },
})()

export async function WorksCard() {
  const contents = await readMarkdowns(
    path.join(process.cwd(), 'src', 'app', 'works', 'contents'),
    WorksFrontmatterSchema,
  ).then(mds => mds.slice(0, 3))

  return (
    <LinkTopCard className={styles.wrapper()} title={'Works'} href={'/works'}>
      <Work content={contents[0]}></Work>
      <Work content={contents[1]}></Work>
      <Work content={contents[2]} className="tw:sp:hidden"></Work>
    </LinkTopCard>
  )
}
