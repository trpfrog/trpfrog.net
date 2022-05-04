import type {NextPage} from 'next'
import {useRouter} from 'next/router';

import styles from "../styles/balloon.module.scss";

import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import React, {useState} from "react";

import useSound from 'use-sound';

type BalloonProps = {
    width: string
    height: string
}

type BalloonDivProps = {
    n: number
    width: number
}

let playSound = () => {};

export const BalloonBox: React.FunctionComponent<BalloonProps> = ({children, width='100%', height='100%'}) => {
    const balloonStyle = {
        width: `${width}`,
        height: `${height}`,
        backgroundSize: `${width} ${height}`
    }
    let sty: string;
    switch (Math.floor(Math.random() * 3)) {
        case 0: sty = 'blue'; break;
        case 1: sty = 'green'; break;
        default: sty = 'orange';
    }
    const [isBroken, setState] = useState(false);
    const [color, setColorState] = useState(sty);

    const breakBalloon = () => {
        setState(true);
        if (!isBroken) {
            playSound();
        }
    }

    return <span
        style={balloonStyle}
        className={`${styles.balloon} ${isBroken ? styles.broken : styles[color]}`}
        onClick={breakBalloon}
    />
}

export const BalloonDiv: React.FunctionComponent<BalloonDivProps> = ({children, n, width = 80}) => {
    const height = width / 0.6;
    return (
        <div id={styles.balloon_grid}>
            {Array.from(Array(n), (v, k) => <BalloonBox key={k} width={`${width}px`} height={`${height}px`}/>)}
        </div>
    );
}

const Balloon: NextPage = () => {
    const router = useRouter();
    const isSoundEnabled = router.query.enableSound == 'true';

    const soundURL = 'https://res.cloudinary.com/trpfrog/video/upload/v1640970224/balloon/break.mp3';
    const [playFunction] = useSound(soundURL, {interrupt: false});
    playSound = isSoundEnabled ? playFunction : () => {};

    const toggleSound = () => {
        router.push({
            pathname: '/balloon',
            query: {
                enableSound: !isSoundEnabled
            }
        })
    }

    const getValidInteger = (s: string) => {
        let n = parseInt(s, 10);
        if(isNaN(n)) n = 0;
        if(n <= 0) n = 1;
        if(n > 10000) n = 10000;
        return n;
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
        <Layout>
            <Title title={'風船コーナー'} description={'風船を割ることができます。(？)'}>
                <p>
                    <span onClick={toggleSound} className={'linkButton'} style={{marginRight: '10px'}}>
                        {isSoundEnabled ? '音を消す' : '音を鳴らす'}
                    </span>
                    <label style={{marginRight: '10px'}}>
                        <input
                            type="number"
                            value={numberOfBalloons}
                            onChange={(e) => changeNumber(e.target.value)}
                            max="10000"
                            min="0"
                        /> balloons
                    </label>
                    {' '}
                    <label>
                        <input
                            type="number"
                            value={balloonSize}
                            onChange={(e) => changeSize(e.target.value)}
                            max="10000"
                            min="0"
                        /> px
                    </label>
                </p>
            </Title>
            <Block>
                <BalloonDiv n={numberOfBalloons} width={balloonSize}/>
            </Block>
        </Layout>
    )
}

export default Balloon
