import path from 'path'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { WorksFrontmatter } from '@/app/works/page'

import { MarkdownWithFrontmatter, readMarkdowns } from '@/lib/mdLoader'
import { tv } from '@/lib/tailwind/variants'

const workStyles = tv({
  slots: {
    wrapper: 'tw-rounded-sm tw-bg-cover tw-bg-center',
    backdrop:
      'tw-size-full tw-p-2 tw-backdrop-blur-[1.5px] ' +
      'tw-flex tw-h-full tw-w-full tw-flex-col tw-justify-end tw-text-white',
    title:
      'tw-text-sm tw-font-bold tw-leading-tight tw-text-white tw-drop-shadow',
    keywords:
      'tw-line-clamp-2 tw-flex tw-flex-wrap tw-gap-x-0.5 tw-gap-y-1 tw-text-xs tw-leading-none ' +
      'tw-mt-1 tw-max-h-[2.5rem] tw-overflow-hidden tw-opacity-80',
    keyword:
      'tw-size-fit tw-rounded-full tw-px-1 tw-py-0.5 ' +
      'tw-bg-white tw-text-black tw-opacity-80',
  },
})()

function Work(props: {
  content: MarkdownWithFrontmatter<WorksFrontmatter>
  className?: string
}) {
  const { content, className } = props
  console.log(content.metadata)
  const imageUrl = `https://res.cloudinary.com/trpfrog/image/upload/w_150/${content.metadata.image?.path}`

  return (
    <div
      className={workStyles.wrapper({ className })}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7)), url('${imageUrl}')`,
      }}
    >
      <div className={workStyles.backdrop()}>
        <h3 className={workStyles.title()}>{content.metadata.title}</h3>
        <div className={workStyles.keywords()}>
          {content.metadata.keywords?.map(t => (
            <span className={workStyles.keyword()} key={t}>
              {t}
            </span>
          ))}
        </div>
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
