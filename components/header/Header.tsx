import Link from 'next/link'
import {useRouter} from "next/router";
import {animate, motion, useMotionValue, useViewportScroll} from "framer-motion";
import React, {FunctionComponent} from "react";
import {NormalTitle} from "./NormalTitle";
import {TopTitle} from "./TopTitle";

const Header: FunctionComponent<{
    isOpened: boolean,
    setHamburgerState: React.Dispatch<React.SetStateAction<boolean>>
}> = props => {

    // Hamburger Menu
    const isOpened = props.isOpened
    const setHamburgerState = props.setHamburgerState
    const hamburger = (
        <div id="hamburger_menu">
            <a
                onClick={() => { setHamburgerState(!isOpened) }}
                className={isOpened ? "menu-trigger-opened" : "menu-trigger-closed"}
            >
                <span/><span/><span/> {/* Hamburger Icon in CSS */}
            </a>
        </div>
    )

    const headerY = useMotionValue(0)

    const handleScroll = (y: number) => {
        const v = scrollY.getVelocity()
        const shouldShowHeader = v < -1000 || y < 500;
        const shouldHideHeader = !shouldShowHeader && v > 1000;

        if (shouldShowHeader) {
            animate(headerY, 0, {duration: 0.05, ease: 'linear'})
        } else if (shouldHideHeader) {
            animate(headerY, -100, {duration: 0.1, ease: 'linear'})
        }
    }

    const router = useRouter();

    const {scrollY} = useViewportScroll()
    scrollY.onChange(handleScroll)

    return (
        <motion.header
            style={{y: headerY}}
        >
            <div id="header-wrapper">
                {router.pathname == '/' ? <TopTitle />  : <NormalTitle />}
                <nav>
                    <ul>
                        {['home', 'works', 'blog'].map(e => (
                            <li key={e}>
                                <Link href={'/' + e == 'home' ? '' : e}>
                                    <a className="headerButton">{e}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {hamburger}
            </div>
        </motion.header>
    );
}

export default Header;