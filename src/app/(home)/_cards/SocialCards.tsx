import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'

import { tv } from '@/lib/tailwind/variants'

const styles = tv({
  slots: {
    card: [
      'tw-flex tw-items-center tw-justify-center',
      'tw-bg-gradient-to-br tw-p-2 tw-text-2xl tw-text-white',
    ],
    wrapper: 'tw-flex tw-flex-col tw-items-center tw-gap-1',
    logo: 'tw-text-4xl !tw-leading-none tw-drop-shadow',
    contact:
      'tw-text-lg tw-font-bold !tw-leading-none tw-drop-shadow-sm sp:tw-text-base',
  },
})()

export function TwitterCard() {
  return (
    <LinkTopCard
      className={styles.card({ class: 'tw-from-blue-500 tw-to-blue-300' })}
      href="https://twitter.com/TrpFrog"
      readMoreText={false}
    >
      <div className={styles.wrapper()}>
        <FontAwesomeIcon icon={faTwitter} className={styles.logo()} />
        <span className={styles.contact()}>@TrpFrog</span>
      </div>
    </LinkTopCard>
  )
}

export function GitHubCard() {
  return (
    <LinkTopCard
      className={styles.card({ class: 'tw-from-purple-700 tw-to-violet-300' })}
      href="https://github.com/trpfrog"
      readMoreText={false}
    >
      <div className={styles.wrapper()}>
        <FontAwesomeIcon icon={faGithub} className={styles.logo()} />
        <span className={styles.contact()}>trpfrog</span>
      </div>
    </LinkTopCard>
  )
}

export function MailCard() {
  return (
    <LinkTopCard
      className={styles.card({
        class: 'tw-from-trpfrog-700 tw-to-trpfrog-300',
      })}
      href="mailto:contact@trpfrog.net"
      readMoreText={false}
    >
      <div className={styles.wrapper()}>
        <FontAwesomeIcon
          icon={faEnvelope}
          className={styles.logo({ class: 'sp:tw-text-3xl' })}
        />
        <div
          className={styles.contact({
            class:
              'tw-flex tw-flex-wrap tw-justify-center *:tw-inline-block sp:tw-text-[13px]',
          })}
        >
          <span>contact</span>
          <span>★trpfrog.net</span>
        </div>
      </div>
    </LinkTopCard>
  )
}
