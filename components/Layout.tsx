import React, {useEffect, useState} from "react";

import Header from './header/Header'
import Footer from "./Footer";
import Navigation, {NAVIGATION_LINKS} from "./Navigation";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

import {motion} from "framer-motion";
import MobileMenu from "./mobile_menu/MobileMenu";
import MobileMenuButton from "./mobile_menu/MobileMenuButton";

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

type Props = {
  style?: any;
  className?: string
  children: React.ReactNode
}

const usePathChangeRecording = () => {
  const router = useRouter();

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem("currentPath");
    const curPath = globalThis.location.pathname;

    storage.setItem('prevPath', prevPath ? prevPath : '');
    storage.setItem('currentPath', curPath);
  }, [router.asPath]);
}

const useMotionDirection = (): (-1 | 0 | 1) => {
  const router = useRouter();
  const [motionDirection, setMotionDirection] = useState(0 as (-1 | 0 | 1))

  useEffect(() => {
    const item = globalThis?.sessionStorage?.getItem('prevPath');

    if (item) {
      const getPageIndexOnNavbar = (url: string) => {
        const subPagePath = url.split('/').slice(0, 2).join('/')
        return NAVIGATION_LINKS.findIndex((value => (value.link === subPagePath)))
      }
      const prevIndex = getPageIndexOnNavbar(item)
      const curIndex = getPageIndexOnNavbar(router.pathname)

      // Determine moving direction
      if (prevIndex !== -1 && curIndex !== -1 && prevIndex !== curIndex) {
        setMotionDirection(prevIndex - curIndex < 0 ? -1 : 1);
      }
    }

    console.log(motionDirection)
  }, [motionDirection, router.pathname])

  return motionDirection
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => setIsMobile(window.innerWidth < 800), [])
  return isMobile
}

const PageTransitionMotion = ({children, motionDirection, isMobile}: {
  children: React.ReactNode,
  motionDirection: (-1 | 0 | 1),
  isMobile: boolean
}) => (
  <motion.div
    initial={
      isMobile
        ? {y: -motionDirection * 70, opacity: 0}
        : {x: -motionDirection * 70, opacity: 0}
    }
    animate={
      isMobile
        ? {y: 0, opacity: 1}
        : {x: 0, opacity: 1}
    }
    exit={
      isMobile
        ? {y: motionDirection * 70, opacity: 0}
        : {x: motionDirection * 70, opacity: 0}
    }
    transition={{
      duration: 0.4,
      type: 'spring',
      mass: 0.5
    }}
    style={{
      display: 'flex',
      flexFlow: 'column'
    }}
  >
    {children}
  </motion.div>
)

const Layout: React.FunctionComponent<Props> = ({
  children, style, className
}) => {

  usePathChangeRecording()

  const isMobile = useIsMobile();
  const motionDirection = useMotionDirection();
  const hamburgerState = useState(false);

  return (
    <>
      <div id={'inner-body'}>
        <Header>
          <MobileMenuButton hamburgerState={hamburgerState}/>
        </Header>
        <Navigation/>
        <MobileMenu hamburgerState={hamburgerState}/>
        <main>
          <PageTransitionMotion motionDirection={motionDirection} isMobile={isMobile}>
            <div id="main_wrapper" style={style} className={className}>
              {children}
            </div>
          </PageTransitionMotion>
        </main>
        <div id="page_top" onClick={backToTop}>
          <span id={'back-to-top-icon'}>
            <FontAwesomeIcon icon={faAngleDoubleUp}/>
          </span>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Layout;
