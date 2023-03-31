'use client';

import {motion} from "framer-motion";
import styles from "../../styles/top-page/TrpFrogAnimation.module.scss"
import React, {useEffect} from "react";
import {parseCookies, setCookie} from "nookies";

type Props = {
  children: React.ReactNode
  id?: string
}

export default function TrpFrogAnimation ({children, id}: Props) {
  const cookies = parseCookies()
  const cookieName = 'doNotPlayTopPageAnimation'
  const doAnimation = cookies[cookieName] !== 'true'

  useEffect(() => {
    setCookie(null, cookieName, 'true', {
      maxAge: 60 * 60 * 24 * 14,
      path: '/',
    })
  }, [])

  return (
    <>
      <div id={styles.animation}>
        <motion.div
          id={styles.trpfrog_name}
          initial={{y: 100, opacity: 0}}
          animate={{y: 0, opacity: 0.7}}
          transition={{delay: doAnimation ? 1.2 : 0.3, duration: 1}}
        >Welcome!
        </motion.div>
        <motion.div
          id={styles.lines}
          initial={{'--trpfrog-animation-start-degree': '0deg'} as any}
          animate={{'--trpfrog-animation-start-degree': '360deg'} as any}
          transition={{duration: 30, repeat: Infinity, ease: 'linear'}}
        />
        <div id={styles.trpfrog_image}/>
      </div>
      <motion.div
        id={id}
        initial={doAnimation ? {y: 'calc(-1 * var(--anim-height))'} : {}}
        animate={{y: 0}}
        transition={{
          delay: 0.4,
          duration: 1
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
