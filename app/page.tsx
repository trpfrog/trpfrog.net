import styles from './style.module.scss';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import TrpFrogAnimationFrame from "./toppage/TrpFrogAnimation";

import AboutMe from "./toppage/AboutMe";
import WhatsNew from "./toppage/WhatsNew";
import Store from "./toppage/Store";
import Bird from "./toppage/Bird";
import Ratings from "./toppage/Ratings";
import Links from "./toppage/Links";
import TopPageBalloons from "./toppage/TopPageBalloons";
import TopPageMusic from "./toppage/TopPageMusic";
import TopPageIcons from "./toppage/TopPageIcons";
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
