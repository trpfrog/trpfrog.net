import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { tv } from 'tailwind-variants'

import { AboutMe } from '@/app/(home)/_cards/AboutMe'
import { Blog } from '@/app/(home)/_cards/Blog'
import { GitHub } from '@/app/(home)/_cards/GitHub'
import { Mail } from '@/app/(home)/_cards/Mail'
import { Twitter } from '@/app/(home)/_cards/Twitter'

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
            <AboutMe />
          </div>
          <div style={{ gridArea: 'twitter' }}>
            <Twitter />
          </div>
          <div style={{ gridArea: 'github' }}>
            <GitHub />
          </div>
          <div style={{ gridArea: 'mail' }}>
            <Mail />
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'univ' }}>
            UEC
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'birth' }}>
            2000/10/17
          </div>
          <div style={{ gridArea: 'blog' }}>
            <Blog />
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'favs' }}>
            Favorites
          </div>
          <div
            className="tw-rounded tw-bg-white"
            style={{ gridArea: 'walking' }}
          >
            Walking
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'ai' }}>
            AI
          </div>
          <div
            className="tw-rounded tw-bg-white"
            style={{ gridArea: 'skills' }}
          >
            Skills
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'comp' }}>
            Competitive
          </div>
          <div
            className="tw-rounded tw-bg-white"
            style={{ gridArea: 'balloon' }}
          >
            Balloon
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'env' }}>
            Environment
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'music' }}>
            Music
          </div>
          <div
            className="tw-rounded tw-bg-white"
            style={{ gridArea: 'stickers' }}
          >
            Stickers
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'store' }}>
            Store
          </div>
          <div className="tw-rounded tw-bg-white" style={{ gridArea: 'birds' }}>
            Birds
          </div>
        </div>
      </MainWrapper>
    </>
  )
}
