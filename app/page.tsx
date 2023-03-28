import styles from '../styles/top-page/main.module.scss';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import TrpFrogAnimationFrame from "../components/toppage/TrpFrogAnimation";

import AboutMe from "../components/toppage/AboutMe";
import WhatsNew from "../components/toppage/WhatsNew";
import Store from "../components/toppage/Store";
import Bird from "../components/toppage/Bird";
import Ratings from "../components/toppage/Ratings";
import Links from "../components/toppage/Links";
import TopPageBalloons from "../components/toppage/TopPageBalloons";
import TopPageMusic from "../components/toppage/TopPageMusic";
import TopPageIcons from "../components/toppage/TopPageIcons";
import React, {Suspense} from "react";

// @ts-ignore
export default async function Index(params) {
  const mainWrapperStyle: React.CSSProperties = {
    display: 'block',
    maxWidth: '100000px',
    margin: '0',
    width: '100%',
    textAlign: 'center'
  }

  return (
    <div id="main_wrapper" style={mainWrapperStyle}>
      <TrpFrogAnimationFrame id={styles.top_page_grid_wrapper}>
        <div id={styles.top_page_grid}>
          <AboutMe id={styles.about_me_grid}/>
          <Suspense fallback={null}>
            {/* @ts-expect-error Server Component */}
            <WhatsNew id={styles.whats_new}/>
          </Suspense>
          <Store id={styles.sticker}/>
          <TopPageIcons id={styles.icons}/>
          <TopPageMusic id={styles.music}/>
          <TopPageBalloons id={styles.balloon}/>
          <Suspense fallback={null}>
            {/* @ts-expect-error Server Component */}
            <Links id={styles.link_grid}/>
          </Suspense>
          <Ratings id={styles.music_game}/>
          <Bird id={styles.bird}/>
        </div>
      </TrpFrogAnimationFrame>
    </div>
  )
}
