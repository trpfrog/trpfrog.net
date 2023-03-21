'use client';

import React, { useState } from 'react';
import Util from "../../lib/utils";
import Balloon, {useBalloonSound} from "../../components/Balloon";
import Title from "../../components/Title";
import Block from "../../components/Block";
import styles from "../../styles/balloon.module.scss";

type BalloonDivProps = {
  n: number
  width: number
}

const BalloonDiv = ({n, width = 80}: BalloonDivProps) => {
  const height = width / 0.6;
  return (
    <div id={styles.balloon_grid}>
      {Array.from(Array(n), (v, k) => (
        <Balloon key={k} width={`${width}px`} height={`${height}px`}/>
      ))}
    </div>
  );
}

export default function BalloonApp() {
  const [isSoundEnabled, setSoundEnabled] = useBalloonSound()

  const getValidInteger = (s: string) => {
    let n = parseInt(s, 10);
    if (isNaN(n)) return 1;
    return Util.clamp(n, 1, 10000)
  }

  const [numberOfBalloons, setNumberOfBalloons] = useState(96);
  const changeNumber = (s: string) => {
    const n = getValidInteger(s);
    setNumberOfBalloons(n);
  }

  const [balloonSize, setBalloonSize] = useState(57);
  const changeSize = (s: string) => {
    const n = getValidInteger(s);
    setBalloonSize(n);
  }
  
  return (
    <>
      <Title title={'風船コーナー'} description={'風船を割ることができます。(？)'}>
        <p>
          <span onClick={() => setSoundEnabled(!isSoundEnabled)} className={'linkButton'} style={{marginRight: '10px'}}>
            {isSoundEnabled ? '音を消す' : '音を鳴らす'}
          </span>
          <label style={{marginRight: '10px'}}>
            <input
              type="number"
              value={numberOfBalloons}
              onChange={(e) => changeNumber(e.target.value)}
              max={10000}
              min={1}
            /> balloons
          </label>
          {' '}
          <label>
            <input
              type="number"
              value={balloonSize}
              onChange={(e) => changeSize(e.target.value)}
              max={10000}
              min={1}
            /> px
          </label>
        </p>
      </Title>
      <Block>
        <BalloonDiv n={numberOfBalloons} width={balloonSize}/>
      </Block>
    </>
  )
}
