import Link from 'next/link'
import {useState} from "react";
import { useRouter } from "next/router";

export const NAVIGATION_LINKS = [
    {
        link: '/',
        name: 'Home'
    },
    {
        link: '/balloon',
        name: 'Balloons'
    },
    {
        link: '/works',
        name: 'Works'
    },
    {
        link: '/environment',
        name: 'Env'
    },
    {
        link: '/music',
        name: 'Music'
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

const Navigation = () => {
    const [isOpened, setHamburgerState] = useState(false);
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
                    className={`sidemenu_link ${isHighlighted ? 'sidemenu_highlighted' : ''}`}
                >{name}</a>
            </Link>
        );
    });

    return (
        <>
            <nav id="wide-nav">
                <div id="wide-nav-wrapper">
                    {links}
                </div>
            </nav>
            <div id="hamburger_menu">
                <a
                    onClick={toggleMenu}
                    className={isOpened ? "menu-trigger-opened" : "menu-trigger-closed"}
                >
                    <span/><span/><span/> {/* Hamburger Icon in CSS */}
                </a>
            </div>
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

