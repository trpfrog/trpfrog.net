import Link from 'next/link'
import React, {FunctionComponent, useState} from "react";
import { useRouter } from "next/router";
import styles from '../styles/common/Navigation.module.scss';

export const NAVIGATION_LINKS = [
    {
        link: '/',
        name: 'Home'
    },
    {
        link: '/works',
        name: 'Works'
    },
    {
        link: '/blog',
        name: 'Blog'
    },
    {
        link: '/balloon',
        name: 'Balloons'
    },
    {
        link: '/environment',
        name: 'Env'
    },
    {
        link: '/stickers',
        name: 'Stickers'
    },
    {
        link: '/icons',
        name: 'Icons'
    },
    {
        link: '/links',
        name: 'Links'
    },
    {
        link: '/download',
        name: 'DLC'
    },
    {
        link: '/icon-maker',
        name: 'Maker'
    },
    {
        link: '/walking',
        name: 'Walk'
    }
]

const Navigation: FunctionComponent<{
    isOpened: boolean,
    setHamburgerState: React.Dispatch<React.SetStateAction<boolean>>
}> = props => {
    const isOpened = props.isOpened
    const setHamburgerState = props.setHamburgerState

    const toggleMenu = () => {
        setHamburgerState(!isOpened);
    }
    const doNothing = () => {};

    const router = useRouter();
    const highlightedLink = router.pathname.split('/').slice(0, 2).join('/');
    const links = NAVIGATION_LINKS.map(({link, name}) => {
        const isHighlighted = highlightedLink == link;
        return (
            <Link href={link} key={link}>
                <a
                    className={`${styles.side_menu_link} ${isHighlighted && styles.side_menu_highlighted}`}
                >{name}</a>
            </Link>
        );
    });

    return (
        <>
            <nav id={styles.wide_nav}>
                <div id={styles.wide_nav_wrapper}>
                    {links}
                </div>
            </nav>
            <section id="mobile_menu">
                <aside
                    id="menu_background"
                    onClick={isOpened ? toggleMenu : doNothing}
                    className={isOpened ? "menu-bkg-opened" : "menu-bkg-closed"}
                />
                <aside id="side_menu" className={isOpened ? "menu-opened" : "menu-closed"}>
                    <div id="side_header"/>
                    <div id="side_links" onClick={toggleMenu}>
                        {links}
                    </div>
                </aside>
            </section>
        </>
    );
}

export default Navigation;

