import Block from "../../components/Block";
import styles from "../../styles/top-page/main.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";

const Balloon = dynamic(() => import('../../components/Balloon'), {ssr: false});

type Props = {
  id?: string
}

const TopPageBalloons = ({id}: Props) => {
  return (
    <Block title={'風船コーナー'} h2icon={'ice'} id={id}>
      <div id={styles.top_balloon_grid}>
        {Array.from(Array(7), (v, k) => <Balloon key={k} width={'100%'} height={'100%'}/>)}
      </div>
      <p>
        <Link href={'/balloon'} className={'linkButton'}>
          もっと割る
        </Link>
      </p>
    </Block>
  )
}

export default TopPageBalloons
