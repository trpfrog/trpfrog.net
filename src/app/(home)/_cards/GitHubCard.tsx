import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tv } from 'tailwind-variants'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'

const styles = tv({
  slots: {
    card: [
      'tw-grid tw-place-items-center tw-text-2xl tw-font-bold tw-text-white',
      'tw-bg-gradient-to-br tw-from-purple-700 tw-to-violet-300',
    ],
    wrapper: 'tw-flex tw-flex-col tw-items-center',
    logo: 'tw-text-4xl',
    id: 'tw-text-xl sp:tw-text-base',
  },
})()

export function GitHubCard() {
  return (
    <LinkTopCard className={styles.card()} href="https://github.com/trpfrog">
      <div className={styles.wrapper()}>
        <FontAwesomeIcon icon={faGithub} className={styles.logo()} />
        <span className={styles.id()}>trpfrog</span>
      </div>
    </LinkTopCard>
  )
}
