// import {
//   BIZ_UDPGothic,
//   Comfortaa,
//   M_PLUS_Rounded_1c,
//   Noto_Sans_JP,
//   Noto_Sans_Mono,
//   Roboto
// } from "next/font/google";
// import {NextFontWithVariable} from "next/dist/compiled/@next/font";
//
// const mPlusRounded1c = M_PLUS_Rounded_1c({
//   subsets: ['latin'],
//   weight: ["100", "400", "700", "800"],
//   display: 'swap',
//   variable: '--font-m-plus-rounded-1c',
// })
//
// const comfortaa = Comfortaa({
//   subsets: ['latin'],
//   variable: '--font-comfortaa',
// })
//
// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ["400", "700"],
//   variable: '--font-roboto',
// })
//
// const notoSansJP = Noto_Sans_JP({
//   subsets: ['latin'],
//   weight: ["400", "700"],
//   variable: '--font-noto-sans-jp',
// })
//
// const notoSansMono = Noto_Sans_Mono({
//   subsets: ['latin'],
//   variable: '--font-noto-sans-mono',
// })
//
// const bizUdpGothic = BIZ_UDPGothic({
//   subsets: ['latin'],
//   weight: ["400", "700"],
//   variable: '--font-biz-udp-gothic',
// })
//
// const fonts: NextFontWithVariable[] = [
//   mPlusRounded1c,
//   comfortaa,
//   roboto,
//   notoSansJP,
//   notoSansMono,
//   bizUdpGothic,
// ]
//
// const fontVariables = fonts.map((font) => font.variable).join(' ');

// Temporary solution for the next/font issue
import styles from '@/components/GoogleFonts/index.module.scss'
const fontVariables = styles.temp_google_font_variables

export default fontVariables
