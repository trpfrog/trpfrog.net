import Link from 'next/link'
import {useRouter} from "next/router";
import {motion, MotionValue, useTransform, useViewportScroll} from "framer-motion";
import {useEffect, useState} from "react";

const normalTitle = (showPageTitle: boolean, title: string) => {
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div id={'header-title'}>
            <div id={'header-title-image'}/>
            <h1>
                {showPageTitle ? (
                    <a onClick={backToTop} style={{cursor: 'pointer'}}>
                        {
                            process.browser
                                ? title
                                : process.env.title
                        }
                    </a>
                ) : (
                    <Link href="/">
                        <a>
                            {process.env.title}
                        </a>
                    </Link>
                )}
            </h1>
        </div>
    );
};

const topTitle = (iconBottom: MotionValue<number>, titleLeft: MotionValue<number>) => {
    return (
        <div id={'header-title'}>
            <motion.div
                id={'header-title-image'}
                style={{bottom: iconBottom}}
            />
            <motion.h1
                initial={{left: titleLeft.get()}}
                style={{left: titleLeft}}
            >
                <Link href="/">
                    <a>{process.env.title}</a>
                </Link>
            </motion.h1>
        </div>
    );
};

const Header = () => {

    const { scrollY } = useViewportScroll();
    const icon = useTransform(scrollY, y => {
        return -80 + Math.min(1, Math.max(0, y - 200) / 175) * 79;
    });
    const title = useTransform(scrollY, y => {
        if (!process.browser) return 4;

        if (window.innerWidth < 800) {
            return -50 + Math.min(1, Math.max(0, y - 200) / 175) * 54;
        } else {
            return -82 + Math.min(1, Math.max(0, y - 200) / 175) * 86;
        }
    });

    const [showPageTitle, setShowPageTitle] = useState(false);
    useEffect(() => {
        const heightToChangeTitle =
            process.browser && window.innerWidth <= 800 ? 120 : 250;
        const handleScroll = () => {
            setShowPageTitle(window.scrollY > heightToChangeTitle);
        };
        // set initial state
        handleScroll();
        // register listener
        window.addEventListener("scroll", handleScroll);
        // clean up
        return () => { window.removeEventListener("scroll", handleScroll); };
    }, []);

    const router = useRouter();
    let pageTitle = process.browser
        ? document.title.replace(' - ' + process.env.title, '')
        : process.env.title as string;
    if(router.pathname.startsWith('/blog')) {
        pageTitle = 'つまみログ';
    }

    return (
        <header>
            <div id="header-wrapper">
                {router.pathname == '/'
                    ? topTitle(icon, title)
                    : normalTitle(showPageTitle, pageTitle)}
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <a className="headerButton">home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/works">
                                <a className="headerButton">works</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog">
                                <a className="headerButton">blog</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;