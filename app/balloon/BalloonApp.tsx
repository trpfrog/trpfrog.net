'use client';

import React, {useState} from 'react';
import Util from "@/lib/utils";
import {useBalloonSound} from "./Balloon";
import Title from "@/components/Title";
import Block from "@/components/Block";
import BalloonArray from "./BalloonArray";

export default function BalloonApp() {
  const [isSoundEnabled, setSoundEnabled] = useBalloonSound()

  const getValidInteger = (s: string) => {
    let n = parseInt(s, 10);
    if (isNaN(n)) return 1;
    return Util.clamp(n, 1, 10000)
  }

  const [numberOfBalloons, setNumberOfBalloons] = useState(96);

  const changeAmount = (s: string) => {
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
              onChange={(e) => changeAmount(e.target.value)}
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
      <Block id={'balloon-window'}>
        <BalloonArray
          n={numberOfBalloons}
          width={balloonSize}
        />
      </Block>
    </>
  )
}
