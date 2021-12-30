import Link from 'next/link'
import {useState} from "react";

const NAVIGATION_LINKS = [
    {
        link: '/',
        name: 'Home'
    },
    {
        link: '/environment',
        name: 'Environment'
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
    }
]

const NAVIGATION_LINKS_ELEMENT = NAVIGATION_LINKS.map(({link, name}) => {
    return (
        <Link href={link} key={link}>
            <a className="sidemenu_link">{name}</a>
        </Link>
    )
});

const Navigation = () => {
    const [isOpened, setHamburgerState] = useState(false);
    const toggleMenu = () => {
        setHamburgerState(!isOpened);
    }
    return (
        <>
            <nav id="wide-nav">
                <div id="wide-nav-wrapper">
                    {NAVIGATION_LINKS_ELEMENT}
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
                    onClick={toggleMenu}
                    className={isOpened ? "menu-bkg-opened" : "menu-bkg-closed"}
                />
                <aside id="side_menu" className={isOpened ? "menu-opened" : "menu-closed"}>
                    <div id="side_header"/>
                    <div id="side_links">
                        {NAVIGATION_LINKS_ELEMENT}
                    </div>
                </aside>
            </section>
        </>
    );
}

export default Navigation;

