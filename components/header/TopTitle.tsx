import {animate, AnimationOptions, motion, useMotionValue, useViewportScroll} from "framer-motion";
import {useEffect} from "react";
import Link from "next/link";

export const TopTitle = () => {

    const titleX = useMotionValue(-82);
    const iconY = useMotionValue(80);

    const handleScroll = (y: number, withAnimation: boolean = true) => {
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

    const {scrollY} = useViewportScroll()
    scrollY.onChange(handleScroll)
    useEffect(() => handleScroll(window.scrollY, false))

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