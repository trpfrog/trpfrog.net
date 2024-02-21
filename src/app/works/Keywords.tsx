import { tv } from '@/lib/tailwind/variants'
import 'devicon'

const styles = tv({
  slots: {
    wrapper: '',
    keywords: 'tw-flex tw-flex-wrap tw-gap-2',
    keyword: [
      'tw-inline-block tw-rounded-full tw-border-2 tw-border-trpfrog-200',
      'tw-px-3 tw-py-1 tw-text-sm tw-font-bold',
    ],
    title: 'tw-mb-1 tw-text-sm tw-text-gray-500',
  },
})()

interface Props {
  keywords: string[]
}

export const technologyIconMap: Record<string, string> = {
  Python: 'devicon-python-plain',
  PyTorch: 'devicon-pytorch-original',
  TypeScript: 'devicon-typescript-plain',
  'Google Cloud': 'devicon-googlecloud-plain',
  'Twitter API': 'devicon-twitter-original',
  Twitter4J: 'devicon-twitter-original',
  React: 'devicon-react-original',
  'Next.js': 'devicon-nextjs-plain',
  'Node.js': 'devicon-nodejs-plain',
  JavaScript: 'devicon-javascript-plain',
  OpenGL: 'devicon-opengl-plain',
  'C++': 'devicon-cplusplus-plain',
  HTML: 'devicon-html5-plain',
  CSS: 'devicon-css3-plain',
  Docker: 'devicon-docker-plain',
  Processing: 'devicon-processing-plain',
  Java: 'devicon-java-plain',
  'C programming': 'devicon-c-plain',
  SCSS: 'devicon-sass-original',
}

export function Keywords({ keywords }: Props) {
  return (
    <div className={styles.wrapper()}>
      <h3 className={styles.title()}>TECHNOLOGIES</h3>
      <ul className={styles.keywords()}>
        {keywords.map(k =>
          k in technologyIconMap ? (
            <li key={k} className={styles.keyword()}>
              <span
                className={`${technologyIconMap[k]} tw-relative tw-top-[1px] tw-mr-1 tw-hidden dark:tw-inline`}
              />
              <span
                className={`${technologyIconMap[k]} colored tw-relative tw-top-[1px] tw-mr-1 dark:tw-hidden`}
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
