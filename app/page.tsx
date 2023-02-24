import styles from '../styles/top-page/main.module.scss';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import TrpFrogAnimationFrame from "./TrpFrogAnimation";

import AboutMe from "./AboutMe";
import WhatsNew from "./WhatsNew";
import Store from "./Store";
import Bird from "./Bird";
import Ratings from "./Ratings";
import Links from "./Links";
import TopPageBalloons from "./TopPageBalloons";
import TopPageMusic from "./TopPageMusic";
import TopPageIcons from "./TopPageIcons";
import React, {Suspense} from "react";


export default async function Index() {

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
            {/*<WhatsNew id={styles.whats_new}/>*/}
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
