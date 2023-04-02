'use client';

import {useScroll} from "framer-motion";
import {useEffect, useState} from "react";
import Link from "next/link";
import styles from "../../styles/common/Header.module.scss";

export const TopTitle = () => {
  const [visible, setVisible] = useState(false);
  const animationHeight = 250;

  const {scrollY} = useScroll()
  scrollY.on("change", () => {
    setVisible(window.scrollY >= animationHeight)
  })

  useEffect(
    () => setVisible(window.scrollY >= animationHeight),
    []
  )

  return (
    <div id={styles.site_logo} data-show-icon={visible}>
      <div id={styles.trpfrog_icon}/>
      <div id={styles.site_name_wrapper}>
        <h1 id={styles.site_name}>
          <Link href="/">
            {process.env.title}
          </Link>
        </h1>
      </div>
    </div>
  );
};
