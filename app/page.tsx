import styles from './style.module.scss';

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
import React from "react";
import TempTwitter from "../components/TempTwitter";

export const revalidate = 30

// @ts-ignore
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
        <TempTwitter/>
        <div id={styles.top_page_grid}>
          <AboutMe id={styles.about_me_grid}/>
          <WhatsNew id={styles.whats_new}/>
          <Store id={styles.sticker}/>
          <TopPageIcons id={styles.icons}/>
          <TopPageMusic id={styles.music}/>
          <TopPageBalloons id={styles.balloon}/>
          <Links id={styles.link_grid}/>
          <Ratings id={styles.music_game}/>
          <Bird id={styles.bird}/>
        </div>
      </TrpFrogAnimationFrame>
    </div>
  )
}
