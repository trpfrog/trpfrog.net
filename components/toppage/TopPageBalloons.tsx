'use client';

import Block from "../../components/Block";
import styles from "../style.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import {useBalloonState} from "../balloon/BalloonArray";

const Balloon = dynamic(() => import('../balloon/Balloon'), {ssr: false});

type Props = {
  id?: string
}

const TopPageBalloons = ({id}: Props) => {

  const balloonAmount = 7;
  const {isBurst, balloonColorArray, onBurst} = useBalloonState(balloonAmount, id ?? '');

  return (
    <Block title={'風船コーナー'} h2icon={'ice'} id={id}>
      <div id={styles.top_balloon_grid}>
        {Array.from(Array(7), (v, k) => (
          <Balloon
            key={k}
            width={'100%'}
            height={'100%'}
            isBurst={isBurst[k]}
            color={balloonColorArray[k]}
            onBurst={() => onBurst({
              index: k,
              currentAmount: balloonAmount
            })}
          />
        ))}
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
