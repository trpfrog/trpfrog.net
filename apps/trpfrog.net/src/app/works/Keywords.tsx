import { Devicon, hasDevicon } from '@/components/atoms/Devicon'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    wrapper: '',
    keywords: 'tw:flex tw:flex-wrap tw:gap-2',
    keyword: [
      'tw:inline-block tw:rounded-full tw:border-2 tw:border-trpfrog-200',
      'tw:px-3 tw:py-1 tw:text-sm tw:font-bold',
    ],
    title: 'tw:mb-1 tw:text-sm tw:text-gray-500',
  },
})()

interface Props {
  keywords: string[]
}

export function Keywords({ keywords }: Props) {
  return (
    <div className={styles.wrapper()}>
      <h3 className={styles.title()}>TECHNOLOGIES</h3>
      <ul className={styles.keywords()}>
        {keywords.map(k =>
          hasDevicon(k) ? (
            <li key={k} className={styles.keyword()}>
              <Devicon
                iconName={k}
                className="tw:relative tw:top-px tw:mr-1 tw:hidden tw:dark:inline"
              />
              <Devicon
                iconName={k}
                colored
                className="tw:relative tw:top-px tw:mr-1 tw:dark:hidden"
              />
              {k}
            </li>
          ) : (
            <li key={k} className={styles.keyword()}>
              {k}
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
