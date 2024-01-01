import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tv } from 'tailwind-variants'

import { TopCard } from '@/app/(home)/_components/TopCard'

const styles = tv({
  slots: {
    card: [
      'tw-grid tw-place-items-center tw-text-2xl tw-text-white',
      'tw-bg-gradient-to-br tw-from-trpfrog-700 tw-to-trpfrog-300 tw-p-3',
    ],
    wrapper: 'tw-flex tw-flex-col tw-items-center',
    logo: 'tw-text-4xl',
    at: 'tw-text-lg',
    id: 'tw-text-xl sp:tw-text-base',
  },
})()

export function Mail() {
  return (
    <TopCard className={styles.card()}>
      <div className={styles.wrapper()}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.logo()} />
        <span className={styles.id()}>contact★trpfrog.net</span>
      </div>
    </TopCard>
  )
}
