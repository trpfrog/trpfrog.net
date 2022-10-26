import {animate, AnimationOptions, motion, useMotionValue, useViewportScroll} from "framer-motion";
import {useEffect} from "react";
import Link from "next/link";
import styles from "../../styles/common/Header.module.scss";

export const TopTitle = () => {

  const titleX = useMotionValue(-82);
  const iconY = useMotionValue(80);

  const handleScroll = (y: number, withAnimation: boolean = true) => {
    const animationHeight = 280;
    const isMobile = window.innerWidth < 800;
    const config: AnimationOptions<number> = {
      duration: withAnimation ? 0.2 : 0,
      ease: 'linear'
    };

    if (y >= animationHeight) {
      animate(iconY, 0, config);
      animate(titleX, 0, config);
    } else {
      animate(iconY, isMobile ? 48 : 80, config);
      animate(titleX, isMobile ? -50 : -82, config);
    }
  }

  const {scrollY} = useViewportScroll()
  scrollY.onChange(handleScroll)
  useEffect(() => handleScroll(window.scrollY, false))

  return (
    <div id={styles.site_logo}>
      <motion.div style={{y: iconY}} id={styles.trpfrog_icon}/>
      <motion.div id={styles.site_name_wrapper} style={{x: titleX}}>
        <h1 id={styles.site_name}>
          <Link href="/">
            {process.env.title}
          </Link>
        </h1>
      </motion.div>
    </div>
  );
};
