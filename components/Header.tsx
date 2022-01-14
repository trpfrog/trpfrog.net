import Link from 'next/link'
import {useRouter} from "next/router";
import {
    animate,
    AnimationOptions,
    motion,
    MotionValue,
    useMotionValue,
    useViewportScroll
} from "framer-motion";
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

const topTitle = (iconY: MotionValue<number>, titleX: MotionValue<number>) => {
    return (
        <div id={'header-title'}>
            <motion.div
                id={'header-title-image'}
                style={{y: iconY}}
            />
            <motion.h1
                style={{x: titleX}}
            >
                <Link href="/">
                    <a>{process.env.title}</a>
                </Link>
            </motion.h1>
        </div>
    );
};

const Header = () => {
    const titleX = useMotionValue(-82);
    const iconY = useMotionValue(80);
    const headerY = useMotionValue(0)
    const [showPageTitle, setShowPageTitle] = useState(false);

    const animateTopPageHeader = (y: number, withAnimation: boolean) => {
        const animationHeight = 280;
        const isMobile = window.innerWidth < 800;
        const config: AnimationOptions<number> = {
            duration: withAnimation ? 0.2 : 0,
            ease: 'linear'
        };

        if (y >= animationHeight) {
            animate(iconY, 0, config);
            animate(titleX, 4, config);
        } else {
            animate(iconY, isMobile ? 48 : 80, config);
            animate(titleX, isMobile ? -50 : -82, config);
        }
    }

    const changeHeaderH1 = (y: number) => {
        const heightToChangeTitle =
            process.browser && window.innerWidth <= 800 ? 120 : 250;
        setShowPageTitle(y > heightToChangeTitle);
    }

    const setHeaderVisibility = (y: number) => {
        const v = scrollY.getVelocity()
        const shouldShowHeader = v < -1000 || y < 500;
        const shouldHideHeader = !shouldShowHeader && v > 1000;

        if (shouldShowHeader) {
            animate(headerY, 0, {duration: 0.05, ease: 'linear'})
        } else if (shouldHideHeader) {
            animate(headerY, -100, {duration: 0.1, ease: 'linear'})
        }
    }

    const handleScroll = (y: number, withAnimation: boolean = true) => {
        changeHeaderH1(y)
        animateTopPageHeader(y, withAnimation)
        setHeaderVisibility(y)
    }

    const {scrollY} = useViewportScroll()
    scrollY.onChange(handleScroll)
    useEffect(() => handleScroll(window.scrollY, false))

    const router = useRouter();
    let pageTitle = process.browser
        ? document.title.replace(' - ' + process.env.title, '')
        : process.env.title as string;
    if(router.pathname.startsWith('/blog')) {
        pageTitle = 'つまみログ';
    }

    return (
        <motion.header
            style={{y: headerY}}
        >
            <div id="header-wrapper">
                {router.pathname == '/'
                    ? topTitle(iconY, titleX)
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
        </motion.header>
    );
}

export default Header;