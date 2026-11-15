import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RichButton, type RichButtonProps } from '@/components/atoms/RichButton'

import styles from './index.module.css'

type EntryButtonProps = Pick<RichButtonProps, 'href' | 'openInNewTab' | 'onClick'> & {
  text: string
  icon: IconProp
}

export function EntryButton(props: EntryButtonProps) {
  const { text, icon, ...rest } = props
  return (
    <RichButton {...rest} className={styles.entry_button}>
      <span className={styles.entry_button_icon}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="tw:inline-block">{text}</span>
    </RichButton>
  )
}
