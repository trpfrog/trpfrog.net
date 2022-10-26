import Block from "../Block";
import styles from "../../styles/top-page/main.module.scss";
import {BalloonBox} from "../../pages/balloon";
import Link from "next/link";

type Props = {
    id?: string
}

const TopPageBalloons = ({id}: Props) => {
  return (
    <Block title={'風船コーナー'} h2icon={'ice'} id={id}>
      <div id={styles.top_balloon_grid}>
        {Array.from(Array(7), (v, k) => <BalloonBox key={k} width={'100%'} height={'100%'}/>)}
      </div>
      <p>
        <Link href={'/balloon'}>
          <a className={'linkButton'}>もっと割る</a>
        </Link>
      </p>
    </Block>
  )
}

export default TopPageBalloons
