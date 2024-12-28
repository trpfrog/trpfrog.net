import { cacheTags } from '@trpfrog.net/constants'

import { TopCard } from '@/app/(home)/_components/TopCard'
import { bffClient } from '@/app/api/client'

import { tv } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'

const image = replaceWithLighterImageFormat(
  'https://res.cloudinary.com/trpfrog/image/upload/w_1000/blog/sugadaira-travel/42C94C5A-04C6-4DEC-9D41-2C87F87D79B7_1_105_c.jpg',
)

const styles = tv({
  slots: {
    bgImage: ['tw-bg-cover tw-bg-center tw-bg-no-repeat sp:tw-bg-left'],
    base: [
      'tw-h-full tw-w-full tw-bg-gradient-to-br tw-from-window-color tw-to-transparent tw-p-8 sp:tw-p-5',
      'tw-flex tw-flex-col tw-justify-between',
    ],
    nameWrapper: 'tw-flex tw-items-baseline tw-gap-2',
    name: 'first:tw-text-4xl first:tw-font-bold last:tw-text-2xl',
    textWrapper: 'tw-text-justify tw-leading-7 sp:tw-text-sm sp:tw-leading-6',
    text: 'tw-mr-1 tw-rounded-sm tw-bg-window-color/95 tw-leading-none',
    introAttribute:
      'tw-relative -tw-left-1 tw-w-fit tw-list-none tw-rounded tw-bg-window-color/90 tw-px-2 tw-py-1.5 tw-text-xs',
    attrItem: 'tw-flex tw-items-start tw-gap-2 tw-leading-relaxed',
  },
})()

// TODO: dynamicIO が stable になったら消す
async function fetchCurrentAge() {
  return await fetch(bffClient.tmp_cache.age.$url().toString(), {
    cache: 'force-cache',
    next: {
      tags: [cacheTags.date.tag],
    },
  }).then(res => res.text())
}

export async function AboutMeCard() {
  const age = await fetchCurrentAge()
  const attributes = [
    { icon: '🐸', iconName: '性別', text: '男性' },
    { icon: '🎂', iconName: '誕生日', text: `2000年10月17日 (${age}歳)` },
    {
      icon: '🏠',
      iconName: '出身',
      text: '東京都 (23区外) 出身',
    },
    {
      icon: '🍎',
      iconName: 'Apple',
      text: 'Apple ユーザー',
    },
  ]

  return (
    <TopCard
      className={styles.bgImage()}
      style={{ backgroundImage: `url('${image}')` }}
      title="About Me"
      titlePosition="top-right"
    >
      <div className={styles.base()}>
        <div>
          <h2 className={styles.nameWrapper()} translate="no">
            <span className={styles.name()}>つまみ</span>
            <span className={styles.name()}>(TrpFrog)</span>
          </h2>
          <p className={styles.textWrapper()}>
            <span className={styles.text()}>
              自然言語生成の研究をしている大学院生
              ……のはずだが、Web開発に興味がありすぎてそういう職業になりそうになっている。
              面白いものが好き、面白ければなんでもやりたい。 みんなそう？そうかも
            </span>
          </p>
        </div>
        <ul className={styles.introAttribute()}>
          {attributes.map(({ icon, iconName, text }) => (
            <li key={text} className={styles.attrItem()}>
              <span title={iconName} className="tw-w-4 tw-text-center">
                {icon}
              </span>
              <span className={'tw-inline-block'}>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </TopCard>
  )
}
