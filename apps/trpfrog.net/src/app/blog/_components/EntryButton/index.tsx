import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RichButton } from '@/components/atoms/RichButton'

import styles from './index.module.scss'

export function EntryButton(props: { text: string; icon: IconProp; onClick?: () => void }) {
  return (
    <RichButton as="button" onClick={props.onClick} className={styles.entry_button}>
      <div className={styles.entry_button_icon}>
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <span className="tw-inline-block">{props.text}</span>
    </RichButton>
  )
}
