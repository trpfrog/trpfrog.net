import path from 'path'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { technologyIconMap } from '@/app/works/Keywords'
import { WorksFrontmatter } from '@/app/works/page'

import { MarkdownWithFrontmatter, readMarkdowns } from '@/lib/mdLoader'
import { tv } from '@/lib/tailwind/variants'
import { ParseWithBudouX } from '@/lib/wordSplit'
import 'devicon'

const workStyles = tv({
  slots: {
    wrapper: 'tw-rounded-sm tw-bg-cover tw-bg-center',
    backdrop:
      'tw-size-full tw-p-2 tw-backdrop-blur-[1.5px] ' +
      'tw-flex tw-h-full tw-w-full tw-flex-col tw-justify-end tw-text-white',
    title:
      'tw-text-lg tw-font-bold tw-leading-tight tw-text-white tw-drop-shadow',
    subtitle:
      'tw-mt-1 tw-text-[11px] tw-leading-tight tw-text-white tw-drop-shadow',
    keywords:
      'tw-flex tw-gap-1 tw-text-xs tw-leading-none ' +
      'tw-mb-1 tw-w-fit tw-overflow-hidden',
    keyword: 'tw-text-lg tw-drop-shadow',
  },
})()

function Work(props: {
  content: MarkdownWithFrontmatter<WorksFrontmatter>
  className?: string
}) {
  const { content, className } = props
  const imageUrl = `https://res.cloudinary.com/trpfrog/image/upload/w_150/${content.metadata.image?.path}`

  return (
    <div
      className={workStyles.wrapper({ className })}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7)), url('${imageUrl}')`,
      }}
    >
      <div className={workStyles.backdrop()}>
        <div className={workStyles.keywords()}>
          {content.metadata.keywords
            ?.filter(k => k in technologyIconMap)
            .map(k => (
              <span
                key={k}
                className={workStyles.keyword({
                  className: `${technologyIconMap[k]}`,
                })}
              />
            ))}
        </div>
        <h3 className={workStyles.title()}>
          <ParseWithBudouX str={content.metadata.title} slug={''} />
        </h3>
        {content.metadata.subtitle && (
          <div className={workStyles.subtitle()}>
            {content.metadata.subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = tv({
  slots: {
    wrapper: 'tw-grid tw-grid-cols-3 tw-gap-0.5 sp:tw-grid-cols-2',
  },
})()

export async function WorksCard() {
  const contents = await readMarkdowns<WorksFrontmatter>(
    path.join(process.cwd(), 'src', 'app', 'works', 'contents'),
  ).then(mds => mds.slice(0, 3))

  return (
    <LinkTopCard className={styles.wrapper()} title={'Works'} href={'/works'}>
      <Work content={contents[0]}></Work>
      <Work content={contents[1]}></Work>
      <Work content={contents[2]} className="sp:tw-hidden"></Work>
    </LinkTopCard>
  )
}
