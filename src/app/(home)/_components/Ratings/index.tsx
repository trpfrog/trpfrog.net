import Block from '@/components/molecules/Block'

import styles from './index.module.scss'

type Props = {
  id?: string
}

const Ratings = ({ id }: Props) => {
  return (
    <Block title={'音楽ゲーム'} h2icon={'pumpkin'} id={id}>
      <ul className={styles.rating_list}>
        <li>
          <b>チュウニズム</b>
          <br />
          <span className={styles.rainbow} style={{ fontSize: '2em' }}>
            max
          </span>
          <span className={styles.rainbow} style={{ fontSize: '2.8em' }}>
            15.03
          </span>
        </li>
        <li>
          <b>オンゲキ</b>
          <br />
          <span className={styles.platinum} style={{ fontSize: '2em' }}>
            max
          </span>
          <span className={styles.platinum} style={{ fontSize: '2.8em' }}>
            14.84
          </span>
        </li>
        <li>
          <b>SOUND VOLTEX</b>
          <br />
          <span className={styles.silver} style={{ fontSize: '2.5em' }}>
            魔騎士
          </span>
        </li>
      </ul>
      <h2 className="robot">競プロ</h2>
      <ul className={styles.rating_list}>
        <li>
          <b>AtCoder</b> (<a href="https://atcoder.jp/users/TrpFrog">TrpFrog</a>
          ) <br />
          <span className={styles.water} style={{ fontSize: '1.5em' }}>
            highest
          </span>
          <span className={styles.water} style={{ fontSize: '2.8em' }}>
            1572
          </span>
        </li>
        <li>
          <b>Codeforces</b> (
          <a href="https://codeforces.com/profile/TrpFrog">TrpFrog</a>) <br />
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

export default Ratings
