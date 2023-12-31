import { InlineLink } from '@/components/atoms/InlineLink'
import { Block } from '@/components/molecules/Block'

import styles from './index.module.scss'

type Props = {
  id?: string
}

export const Ratings = ({ id }: Props) => {
  return (
    <Block title={'競プロ'} h2icon={'car'} id={id}>
      <ul className={styles.rating_list}>
        <li>
          <b>AtCoder</b> (
          <InlineLink href="https://atcoder.jp/users/TrpFrog">
            TrpFrog
          </InlineLink>
          ) <br />
          <span className={styles.water} style={{ fontSize: '1.5em' }}>
            highest
          </span>
          <span className={styles.water} style={{ fontSize: '2.8em' }}>
            1596
          </span>
        </li>
        <li>
          <b>Codeforces</b> (
          <InlineLink href="https://codeforces.com/profile/TrpFrog">
            TrpFrog
          </InlineLink>
          ) <br />
          <span className={styles.blue} style={{ fontSize: '2em' }}>
            max
          </span>
          <span className={styles.blue} style={{ fontSize: '2.8em' }}>
            1687
          </span>
        </li>
      </ul>
    </Block>
  )
}
