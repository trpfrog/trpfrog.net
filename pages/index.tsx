import type {GetStaticProps, NextPage} from 'next'
import Layout from "../components/Layout";
import styles from '../styles/top-page/main.module.scss';

import {MyLinkRecord, getMyLinkRecords} from '../lib/MyLinks';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import {NextSeo} from "next-seo";
import {motion} from "framer-motion";
import TrpFrogAnimation from "../components/toppage/TrpFrogAnimation";

import {getWhatsNewRecords, WhatsNewRecord} from "../lib/whats_new";

import AboutMe from "../components/toppage/AboutMe";
import WhatsNew from "../components/toppage/WhatsNew";
import Store from "../components/toppage/Store";
import Bird from "../components/toppage/Bird";
import Ratings from "../components/toppage/Ratings";
import Links from "../components/toppage/Links";
import TopPageBalloons from "../components/toppage/TopPageBalloons";
import TopPageMusic from "../components/toppage/TopPageMusic";
import TopPageIcons from "../components/toppage/TopPageIcons";
import {parseCookies, setCookie} from "nookies";
import {useEffect} from "react";

type PageProps = {
    myLinks: MyLinkRecord[]
    whatsNew: WhatsNewRecord[]
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const myLinks: MyLinkRecord[] = await getMyLinkRecords()
    const whatsNew: WhatsNewRecord[] = await getWhatsNewRecords()

    return {
        props: {
            myLinks,
            whatsNew,
        }
    }
}

const Home: NextPage<PageProps> = ({myLinks, whatsNew}) => {

    const mainWrapperStyle = {
        display: 'block',
        maxWidth: '100000px',
        margin: '0',
        width: '100%',
        textAlign: 'center'
    }

    const cookies = parseCookies()
    const cookieName = 'doNotPlayTopPageAnimation'
    const doAnimation = cookies[cookieName] !== 'true'

    useEffect(() => {
        setCookie(null, cookieName, 'true', {
            maxAge: 60 * 60 * 24 * 14,
            path: '/',
        })
    }, [])

    return (
        <Layout style={mainWrapperStyle}>
            <NextSeo
                title={'つまみネット'}
                description={'さかなになりたいね'}
            />

            <TrpFrogAnimation hasDelay={doAnimation}/>

            <motion.div
                id={styles.top_page_grid_wrapper}
                initial={doAnimation ? { y: 'calc(-1 * var(--anim-height))' } : {}}
                animate={{ y: 0 }}
                transition={{
                    delay: 0.4,
                    duration: 1
                }}
            >
                <div id={styles.top_page_grid}>
                    <AboutMe id={styles.about_me_grid}/>
                    <WhatsNew id={styles.whats_new} whatsNewRecords={whatsNew} />
                    <Store id={styles.sticker} />
                    <TopPageIcons id={styles.icons} />
                    <TopPageMusic id={styles.music} />
                    <TopPageBalloons id={styles.balloon} />
                    <Links id={styles.link_grid} myLinks={myLinks}/>
                    <Ratings id={styles.music_game} />
                    <Bird id={styles.bird} />
                </div>
            </motion.div>
        </Layout>
    )
}

export default Home
