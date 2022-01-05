import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from "next/router";
import {motion, MotionValue, useTransform, useViewportScroll} from "framer-motion";

const normalTitle = (
    <div id={'header-title'}>
        <div id={'header-title-image'}/>
        <h1>
            <Link href="/">
                <a>{process.env.title}</a>
            </Link>
        </h1>
    </div>
);

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
    const router = useRouter();
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

    return (
        <header>
            <div id="header-wrapper">
                {router.pathname == '/' ? topTitle(icon, title) : normalTitle}
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <a className="headerButton">home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notes">
                                <a className="headerButton">notes</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://trpfrog.hateblo.jp">
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