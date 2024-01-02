import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { tv } from 'tailwind-variants'

import * as cards from '@/app/(home)/_cards'

import { MainWrapper } from '@/components/atoms/MainWrapper'

import { TempTwitter } from './_components/TempTwitter'
import { TrpFrogAnimation as TrpFrogAnimationFrame } from './_components/TrpFrogAnimation'
import css from './page.module.css'

const styles = tv({
  slots: {
    grid: 'tw-grid tw-gap-3 sp:tw-gap-2',
    subgrid: 'tw-col-span-full tw-grid tw-grid-cols-subgrid',
  },
})()

export default async function Index() {
  return (
    <>
      <TrpFrogAnimationFrame />
      <MainWrapper>
        <TempTwitter />
        <div className={styles.grid({ className: css.layout })}>
          <div style={{ gridArea: 'about-me' }}>
            <cards.AboutMeCard />
          </div>
          <div style={{ gridArea: 'twitter' }}>
            <cards.TwitterCard />
          </div>
          <div style={{ gridArea: 'github' }}>
            <cards.GitHubCard />
          </div>
          <div style={{ gridArea: 'mail' }}>
            <cards.MailCard />
          </div>
          <div style={{ gridArea: 'univ' }}>
            <cards.BelongingCard />
          </div>
          <div style={{ gridArea: 'birth' }}>
            <cards.BirthdayCard />
          </div>
          <div style={{ gridArea: 'blog' }}>
            <cards.BlogCard />
          </div>
          <div style={{ gridArea: 'favs' }}>
            <cards.FavoritesCard />
          </div>
          <div style={{ gridArea: 'walking' }}>
            <cards.WalkingCard />
          </div>
          <div style={{ gridArea: 'ai' }}>
            <cards.AICard />
          </div>
          <div style={{ gridArea: 'skills' }}>
            <cards.SkillCard />
          </div>
          <div style={{ gridArea: 'comp' }}>
            <cards.CompetitiveCard />
          </div>
          <div style={{ gridArea: 'balloon' }}>
            <cards.BalloonCard />
          </div>
          <div style={{ gridArea: 'env' }}>
            <cards.EnvironmentCard />
          </div>
          <div style={{ gridArea: 'music' }}>
            <cards.MusicCard />
          </div>
          <div style={{ gridArea: 'stickers' }}>
            <cards.StickersCard />
          </div>
          <div style={{ gridArea: 'store' }}>
            <cards.StoreCard />
          </div>
          <div style={{ gridArea: 'birds' }}>
            <cards.BirdsCard />
          </div>
        </div>
      </MainWrapper>
    </>
  )
}
