'use client';

import React, {Dispatch, useState} from "react";
import styles from "../app/balloon/BalloonApp.module.scss";
import useSound from "use-sound";

type BalloonProps = {
  width: string
  height: string
}

const balloonColors = ['blue', 'green', 'orange']

let playSound = () => {};
export const useBalloonSound = (): [boolean, Dispatch<boolean>] => {
  const [isSoundEnabled, setSoundEnabled] = useState(false)
  const soundURL = 'https://res.cloudinary.com/trpfrog/video/upload/v1652447772/balloon/break-immeditary.mp3';
  const [playFunction] = useSound(soundURL, {interrupt: false});
  playSound = isSoundEnabled ? playFunction : () => {};
  return [isSoundEnabled, setSoundEnabled]
}

const Balloon = ({width = '100%', height = '100%'}: BalloonProps) => {
  const [balloonColor] = useState(balloonColors[Math.floor(Math.random() * 3)])
  const [isBroken, setState] = useState(false);

  return (
    <span
      style={{
        width, height,
        backgroundSize: `${width} ${height}`
      }}
      className={styles.balloon}
      data-broken-balloon={isBroken}
      data-balloon-color={balloonColor}
      onClick={() => {
        setState(true);
        if (!isBroken) {
          playSound();
        }
      }}
    />
  )
}

export default Balloon
