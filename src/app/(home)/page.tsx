import styles from './style.module.scss'

import React from 'react'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import TrpFrogAnimationFrame from './_components/TrpFrogAnimation'
import AboutMe from './_components/AboutMe'
import WhatsNew from './_components/WhatsNew'
import Store from './_components/Store'
import Bird from './_components/Bird'
import Ratings from './_components/Ratings'
import Links from './_components/Links'
import TopPageBalloons from './_components/TopPageBalloons'
import TopPageMusic from './_components/TopPageMusic'
import TopPageIcons from './_components/TopPageIcons'
import TempTwitter from './_components/TempTwitter'
import MainWrapper from '@/components/atoms/MainWrapper'

export const revalidate = 30

// @ts-ignore
export default async function Index() {
  const mainWrapperStyle: React.CSSProperties = {
    display: 'block',
    maxWidth: '100000px',
    margin: '0',
    width: '100%',
    textAlign: 'center',
  }

  return (
    <MainWrapper style={mainWrapperStyle}>
      <TrpFrogAnimationFrame id={styles.top_page_grid_wrapper}>
        <TempTwitter />
        <div id={styles.top_page_grid}>
          <AboutMe id={styles.about_me_grid} />
          <WhatsNew id={styles.whats_new} />
          <Store id={styles.sticker} />
          <TopPageIcons id={styles.icons} />
          <TopPageMusic id={styles.music} />
          <TopPageBalloons id={styles.balloon} />
          <Links id={styles.link_grid} />
          <Ratings id={styles.music_game} />
          <Bird id={styles.bird} />
        </div>
      </TrpFrogAnimationFrame>
    </MainWrapper>
  )
}
