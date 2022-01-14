import {useState} from "react";
import {useViewportScroll} from "framer-motion";
import {useRouter} from "next/router";
import Link from "next/link";

export const NormalTitle = () => {
    const [showPageTitle, setShowPageTitle] = useState(false);

    const handleScroll = (y: number) => {
        const heightToChangeTitle =
            process.browser && window.innerWidth <= 800 ? 120 : 250;
        setShowPageTitle(y > heightToChangeTitle);
    }
    const {scrollY} = useViewportScroll()
    scrollY.onChange(handleScroll)

    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const router = useRouter();
    let pageTitle = process.browser
        ? document.title.replace(' - ' + process.env.title, '')
        : process.env.title as string;
    if (router.pathname.startsWith('/blog')) {
        pageTitle = 'つまみログ';
    }

    return (
        <div id={'header-title'}>
            <div id={'header-title-image'}/>
            <h1>
                {showPageTitle ? (
                    <a onClick={backToTop} style={{cursor: 'pointer'}}>
                        {process.browser ? pageTitle : process.env.title}
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