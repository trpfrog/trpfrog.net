import {
  IconDefinition,
  faBirthdayCake,
  faCode,
  faFlask,
  faHeart,
  faHorse,
  faLaptop,
  faMapMarkerAlt,
  faTelevision,
  faUniversity,
  faWalking,
} from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic'

import { ATCODER_HIGHEST, WALKING_FARTHEST } from '@/lib/constants'

type Attribute = { icon: IconDefinition; iconName: string; text: string }

export const attributes: Attribute[] = [
  { icon: faMapMarkerAlt, iconName: '住まい', text: '東京都 (多摩地域)' },
  {
    icon: faUniversity,
    iconName: '大学',
    text: '電気通信大学大学院 情報学専攻 修士1年',
  },
  { icon: faBirthdayCake, iconName: '誕生日', text: '2000年10月17日 (23歳)' },
  { icon: faHeart, iconName: '好き', text: 'コンピュータ / Web開発 / 散歩' },
  {
    icon: faCode,
    iconName: '使用言語',
    text: 'TypeScript (React) / Python (PyTorch) / Java',
  },
  { icon: faFlask, iconName: '研究分野', text: '深層学習による自然言語処理' },
  {
    icon: faLaptop,
    iconName: '使用PC',
    text: 'MacBook Pro (2021, 14-inch, M1 Pro)',
  },
  {
    icon: faHorse,
    iconName: 'AtCoder',
    text: `AtCoder水色 (highest ${ATCODER_HIGHEST})`,
  },
  {
    icon: faWalking,
    iconName: '徒歩',
    text: `徒歩会 (farthest ${WALKING_FARTHEST})`,
  },
]

export const additionalAttributes: Attribute[] = [
  {
    icon: faTelevision,
    iconName: '良かったアニメ (原作が存在している場合は買っている)',
    text: [
      '私に天使が舞い降りた！',
      'ぼっち・ざ・ろっく！',
      '恋する小惑星',
      'やがて君になる',
      '三ツ星カラーズ',
      '安達としまむら',
      'リコリス・リコイル',
      '響け！ユーフォニアム',
      'けものフレンズ',
      'ゆるゆり',
      'citrus',
      'Dr.STONE',
      '天気の子',
      'アイの歌声を聴かせて',
    ].join(' / '),
  },
  {
    icon: faBook,
    iconName: '良かった小説・漫画',
    text: [
      'ななどなどなど',
      'ふたりエスケープ',
      '週に一度クラスメイトを買う話',
      '性悪天才幼馴染との勝負に負けて初体験を全部奪われる話',
      'さよならローズガーデン',
      'お兄ちゃんはおしまい！',
      'Still Sick',
      'ハッピー・シュガー・ライフ',
    ].join(' / '),
  },
  {
    icon: faMusic,
    iconName: 'ここ数年好きな音楽 (ジャンル・アーティスト名ごちゃ混ぜ)',
    text: [
      'UK Hardcore',
      'Speedcore',
      'Trance',
      'HARDCORE TANO*C (数度現地に行っている)',
      '吹奏楽曲 (元吹部、トランペットをやっていた)',
      '結束バンド',
    ].join(' / '),
  },
]
