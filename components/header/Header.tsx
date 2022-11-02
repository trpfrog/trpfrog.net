import Link from 'next/link'
import {useRouter} from "next/router";
import {animate, motion, useMotionValue, useScroll} from "framer-motion";
import React, {useState} from "react";
import {NormalTitle} from "./NormalTitle";
import {TopTitle} from "./TopTitle";
import styles from "../../styles/common/Header.module.scss";

export const HeaderFollowSticky = (props: {
  children: React.ReactNode,
  top: string | number
}) => {

  const {scrollY} = useScroll()
  const [headerTop, setHeaderTop] = useState(`calc(var(--header-height) + ${props.top})`)

  const handleScroll = (y: number) => {
    const v = scrollY.getVelocity()
    const shouldShowHeader = v < -1000 || y < 500;
    const shouldHideHeader = !shouldShowHeader && v > 1000;

    if (shouldShowHeader) {
      setHeaderTop(`calc(var(--header-height) + ${props.top})`)
    } else if (shouldHideHeader) {
      setHeaderTop(`${props.top}`)
    }
  }
  scrollY.onChange(handleScroll)

  return (
    <div style={{transition: '0.1s', position: 'sticky', top: headerTop}}>
      {props.children}
    </div>
  )
}

const HideWhenScrollDown = (props: { children: React.ReactNode }) => {
  const headerY = useMotionValue(0)
  const {scrollY} = useScroll()

  scrollY.onChange((y: number) => {
    const v = scrollY.getVelocity()
    const shouldShowHeader = v < -1000 || y < 500;
    const shouldHideHeader = !shouldShowHeader && v > 1000;

    if (shouldShowHeader) {
      animate(headerY, 0, {duration: 0.05, ease: 'linear'})
    } else if (shouldHideHeader) {
      animate(headerY, -100, {duration: 0.1, ease: 'linear'})
    }
  })

  return (
    <motion.div style={{y: headerY}}>
      {props.children}
    </motion.div>
  )
}

const Header: React.FC<{children?: React.ReactNode}> = ({children}) => {

  const router = useRouter();

  return (
    <HideWhenScrollDown>
      <header id={styles.header}>
        <div id={styles.inside}>
          {router.pathname == '/' ? <TopTitle/> : <NormalTitle/>}
          <nav id={styles.navigation}>
            <ul>
              {['home', 'works', 'blog'].map(e => (
                <li key={e}>
                  <Link
                    href={e == 'home' ? '/' : '/' + e}
                    className="headerButton"
                  >
                    {e}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {children}
        </div>
      </header>
    </HideWhenScrollDown>
  );
}

export default Header;
