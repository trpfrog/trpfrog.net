import { TopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { useTooltip } from '@/hooks/useTooltip'

import { tv } from '@/lib/tailwind'

/* eslint-disable no-irregular-whitespace */
const leftBird = `

　　 ／￣￣＼　ﾑｼｬﾑｼｬ
  /　 (●)/￣￣＼
.　 / 　 　ト、 　 ＼
　彳 　 　 ＼＼　　|
.／　　　/⌒ヽヽ　 |
/　 　 　 |　　| .|　 /。
　　　　|　　ヽ|／∴
　　　　　　　。゜
`.trimEnd()

const rightBird = `
オエーー!!　＿＿_
　　　 ＿＿_／　　　　 ヽ
　　 ／ 　 ／　／⌒ヽ|
/　(ﾟ)/　 ／ /
.　 /　 　 ﾄ､ /｡⌒ヽ。
　彳　 　 ＼＼ﾟ｡∴｡ｏ
.／　　　　 ＼＼｡ﾟ｡ｏ
/　　　　 ／⌒＼Ｕ∴)
　　　 　 | 　　ﾞＵ |
　　　 　 | 　　　| |
　　　　　　　　Ｕ
`.trimEnd()
/* eslint-enable no-irregular-whitespace */

const styles = tv({
  slots: {
    base: [
      'tw:flex tw:items-center tw:justify-center tw:gap-6',
      'tw:font-mono tw:text-[11px] tw:leading-none',
      'tw:bg-text-color/80 tw:text-window-color',
    ],
    button: cardButtonStyle({
      class: 'tw:absolute tw:bottom-2 tw:right-2 tw:size-8 tw:rounded-full',
    }),
    tooltipContent: 'tw:bg-window-color! tw:text-text-color!',
  },
})()

export function BirdsCard() {
  const { TooltipContent, TooltipButton } = useTooltip()

  return (
    <TopCard className={styles.base()}>
      <pre>{leftBird}</pre>
      <pre>{rightBird}</pre>
      <TooltipButton className={styles.button()}>?</TooltipButton>
      <TooltipContent className={styles.tooltipContent()}>
        なぜか2019年からトップページにいる、特に意味のない鳥です
      </TooltipContent>
    </TopCard>
  )
}
