import {useState} from "react";
import {useViewportScroll} from "framer-motion";
import {NextRouter, useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/common/Header.module.scss";

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const extractTitle = (router: NextRouter) => {
    const rawPageTitle =
        typeof document !== 'undefined'
        ? document.title
        : process.env.title as string

    let pageTitle = rawPageTitle.split(' - ')[0]
    let subTitle = '';

    // Get article title
    if (router.pathname.startsWith('/blog/entry/')) {
        subTitle = pageTitle
        pageTitle = 'つまみログ';
    }

    return {
        pageTitle, subTitle
    }
}

export const NormalTitle = () => {
    const [showPageTitle, setShowPageTitle] = useState(false);

    const handleScroll = (y: number) => {
        const heightToChangeTitle =
            (typeof window !== 'undefined') && window.innerWidth <= 800 ? 120 : 250;
        setShowPageTitle(y > heightToChangeTitle);
    }
    const {scrollY} = useViewportScroll()
    scrollY.onChange(handleScroll)

    const router = useRouter();
    const {pageTitle, subTitle} = extractTitle(router)

    return (
        <div id={styles.site_logo}>
            <div id={styles.trpfrog_icon}>
                <Image
                    src={'flat-trpfrog-gif'}
                    alt={"TrpFrog's icon"}
                    width={100}
                    height={100}
                    priority={true}
                    layout={"responsive"}
                />
            </div>
            <div id={styles.site_name_wrapper}>
                <h1 id={styles.site_name}>
                    {showPageTitle ? (
                        <a onClick={backToTop} style={{cursor: 'pointer'}}>
                            {typeof window !== 'undefined' ?
                                <div className={styles.on_subtitle_showed}>
                                    {pageTitle}<br/>
                                    <div id={styles.subtitle}>{subTitle}</div>
                                </div> :
                                <>{process.env.title}</>}
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
        </div>
    );
};